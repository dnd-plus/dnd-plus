import Server from '@logux/server/server'
import { GUEST_USER, userActions } from 'common/modules/user/redux'
import { User } from './user.schema'
import {
  UNIQUE_FIELD_EXIST,
  UNKNOWN_USER,
  WRONG_PASSWORD,
} from 'common/constants/errors/user'
import { jwtDecode, jwtEncode } from 'utils/jwt'
import {
  emailValidator,
  loginValidator,
  passwordValidator,
} from 'common/modules/user/validators'

module.exports = function userModule(server: Server) {
  server.auth(async ({ userId, token }) => {
    if (userId === GUEST_USER) {
      return true
    }

    try {
      const data = await jwtDecode(token)
      return data.login === userId
    } catch (e) {
      return false
    }
  })

  server.type(userActions.register, {
    async access() {
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

      const user = new User({ login, email })
      await user.setPassword(password)
      try {
        await user.save()
        const token = jwtEncode({ login })
        ctx.sendBack(userActions.done({ login, token }))
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
      const user = await User.findOne({ login }).exec()
      if (!user) {
        server.undo(meta, UNKNOWN_USER)
        return
      }

      if (await user.checkPassword(password)) {
        const token = jwtEncode({ login })
        ctx.sendBack(userActions.done({ login, token }))
        return
      }

      server.undo(meta, WRONG_PASSWORD)
    },
  })
}
