import { Server, Action } from '@logux/server'
import { ActionCreator, ActionCallbacks } from '@logux/server/base-server'
import {
  Character,
  CharacterDocument,
} from 'modules/character/schemas/character.schema'
import { GUEST_USER } from 'common/modules/user/redux'
import { characterChannel } from 'common/modules/character/channels'
import { EntityQueue } from 'modules/EntityQueue'
import { WithCharacterReducer } from 'common/modules/character/characterUpdaters'

export const characterQueue = new EntityQueue()

type ChData = { character: CharacterDocument }
type ChDataMaybe = { character: CharacterDocument | null }

export function createCharacterType<S extends Server<H>, H extends object = {}>(
  server: S,
) {
  return function characterType<
    AC extends ActionCreator & {
      (...args: any): Action & {
        payload: { _id: string; [extra: string]: any }
      }
    },
    D extends object = {},
    CU extends boolean | undefined = true,
  >(
    actionCreator: AC,
    updater:
      | Partial<
          ActionCallbacks<
            ReturnType<AC>,
            D & (CU extends false ? ChDataMaybe : ChData),
            H
          >
        >
      | WithCharacterReducer,
    options: {
      checkGuest?: boolean
      checkUser?: CU
      resendAction?: boolean
      saveCharacter?: boolean
    } = {},
  ): void {
    type Callbacks = Exclude<typeof updater, WithCharacterReducer>
    const callbacks: Callbacks =
      typeof updater === 'function'
        ? {
            process: (ctx, action) => {
              if (ctx.data.character) updater(ctx.data.character, action)
            },
          }
        : updater
    const { access, resend, finally: finallyCallback, process } = callbacks
    const {
      checkGuest = true,
      checkUser = true,
      resendAction = true,
      saveCharacter = true,
    } = options

    server.type<
      AC,
      D & { doneTask(): void } & (CU extends false ? ChDataMaybe : ChData)
    >(actionCreator, {
      async access(ctx, action, meta) {
        ctx.data.doneTask = characterQueue.createTask(action.payload._id)

        if (checkGuest && ctx.userId === GUEST_USER) return false

        const character = await Character.findById(action.payload._id)

        if (checkUser && character?.userId?.toString() !== ctx.userId) {
          return false
        }

        ctx.data.character = character

        return access ? await access(ctx, action, meta) : true
      },
      async process(ctx, action, meta) {
        const result = await process?.(ctx, action, meta)

        if (saveCharacter) {
          ctx.data.character?.save()
        }

        return result
      },
      async resend(ctx, action, meta) {
        const to = resend ? await resend(ctx, action, meta) : {}

        if (!resendAction || !ctx.data.character) return to

        const channel = characterChannel.link(ctx.data.character._id.toString())

        if (to.channel) {
          to.channels = [to.channel, channel]
          delete to.channel
        } else if (to.channels) {
          to.channels = to.channels.concat(channel)
        } else {
          to.channel = channel
        }

        const user = ctx.userId

        if (to.user) {
          to.users = [to.user, user]
          delete to.user
        } else if (to.users) {
          to.users = to.users.concat(user)
        } else {
          to.user = user
        }

        return to
      },
      async finally(ctx, action, meta) {
        ctx.data?.doneTask()

        return finallyCallback && finallyCallback(ctx, action, meta)
      },
    })
  }
}
