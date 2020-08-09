import Server from '@logux/server/server'
import { GUEST_USER, userActions } from 'common/modules/user/redux'
import { User } from './user.schema'
import {
  UNIQUE_FIELD_EXIST,
  UNKNOWN_USER,
  WRONG_PASSWORD,
} from 'common/modules/user/errors'
import { jwtDecode, jwtEncode } from 'utils/jwt'
import {
  emailValidator,
  loginValidator,
  passwordValidator,
} from 'common/modules/user/validators'
import { currentUserChannel } from 'common/modules/user/channels'

module.exports = function userModule(server: Server) {
  server.auth(async ({ userId, token }) => {
    if (userId === GUEST_USER) {
      return true
    }

    try {
      const data = await jwtDecode(token)
      return data.userId === userId
    } catch (e) {
      return false
    }
  })

  server.channel(currentUserChannel.path, {
    access() {
      return true
    },
    async load(ctx) {
      if (ctx.userId === GUEST_USER) return

      const user = await User.findById(ctx.userId)
      if (user) {
        return userActions.load(user.toObject())
      }
    },
  })

  server.type(userActions.register, {
    access() {
      return true
    },
    async process(ctx, { payload: { email, login, password } }, meta) {
      if (
        loginValidator(login) ||
        emailValidator(email) ||
        passwordValidator(password)
      ) {
        server.undo(meta)
        return
      }

      let user = new User({ login, email })
      await user.setPassword(password)
      try {
        user = await user.save()
        const userId = user._id.toString()
        const token = jwtEncode({ userId })
        ctx.sendBack(userActions.done({ userId, token }))
      } catch (error) {
        if (error.name === 'ValidationError' && error.errors) {
          server.undo(meta, UNIQUE_FIELD_EXIST, {
            email: !!error.errors.email,
            login: !!error.errors.login,
          })
        } else {
          throw error
        }
      }
    },
  })

  server.type(userActions.login, {
    async access() {
      return true
    },
    async process(ctx, { payload: { login, password } }, meta) {
      const user = await User.findOne({ login }, '+passwordHash').exec()
      if (!user) {
        server.undo(meta, UNKNOWN_USER)
        return
      }

      if (await user.checkPassword(password)) {
        const userId = user._id.toString()
        const token = jwtEncode({ userId })
        ctx.sendBack(userActions.done({ userId, token }))
        return
      }

      server.undo(meta, WRONG_PASSWORD)
    },
  })
}
