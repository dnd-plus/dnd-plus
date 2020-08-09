import { Server, Action } from '@logux/server'
import { ActionCreator, ActionCallbacks } from '@logux/server/base-server'
import {
  Character,
  CharacterDocument,
} from 'modules/character/character.schema'
import { GUEST_USER } from 'common/modules/user/redux'
import { characterChannel } from 'common/modules/character/channels'

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
    CU extends boolean | undefined = true
  >(
    actionCreator: AC,
    {
      access,
      resend,
      ...callbacks
    }: Partial<
      ActionCallbacks<
        ReturnType<AC>,
        D & (CU extends false ? ChDataMaybe : ChData),
        H
      >
    >,
    options: {
      checkGuest?: boolean
      checkUser?: CU
      resendAction?: boolean
    } = {},
  ): void {
    const { checkGuest = true, checkUser = true, resendAction = true } = options

    server.type<AC, D & (CU extends false ? ChDataMaybe : ChData)>(
      actionCreator,
      {
        ...callbacks,
        async access(ctx, action, meta) {
          if (checkGuest && ctx.userId === GUEST_USER) return false

          const character = await Character.findById(action.payload._id)

          if (checkUser && character?.userId?.toString() !== ctx.userId) {
            return false
          }

          ctx.data.character = character

          return access ? await access(ctx, action, meta) : true
        },
        async resend(ctx, action, meta) {
          const to = resend ? await resend(ctx, action, meta) : {}

          if (!resendAction || !ctx.data.character) return to

          const channel = characterChannel.link(
            ctx.data.character._id.toString(),
          )

          if (to.channel) {
            to.channels = [to.channel, channel]
            delete to.channel
          } else if (to.channels) {
            to.channels = to.channels.concat(channel)
          } else {
            to.channel = channel
          }

          return to
        },
      },
    )
  }
}
