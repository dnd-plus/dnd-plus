import Server from '@logux/server/server'
import {
  characterChannel,
  currentUserCharactersChannel,
} from 'common/modules/character/channels'
import { GUEST_USER } from 'common/modules/user/redux'
import {
  Character,
  CharacterDocument,
} from 'modules/character/schemas/character.schema'
import { characterActions } from 'common/modules/character/redux'
import { mongoose } from '@typegoose/typegoose'
import {
  characterQueue,
  createCharacterType,
} from 'modules/character/createCharacterType'
import { dateUTCNow } from 'common/utils/dateUTCNow'
import { characterUpdaters } from 'common/modules/character/characterUpdaters'
import { keys } from 'common/utils/typesafe'

module.exports = function characterModule(server: Server) {
  server.on('preadd', (action, meta) => {
    meta.time = dateUTCNow()
  })

  server.channel(currentUserCharactersChannel.path, {
    access(ctx) {
      return ctx.userId !== GUEST_USER
    },
    async load(ctx) {
      const params = { userId: ctx.userId }

      const characterIds = await Character.find(params, { _id: 1 }).exec()
      await Promise.all(
        characterIds.map(({ _id }) => characterQueue.waitCurrentTasks(_id)),
      )

      const characters: CharacterDocument[] = await Character.find(params)
        .sort({ updatedAt: -1 })
        .exec()

      characters.forEach((character) => {
        ctx.sendBack(characterActions.load(character.toObject()))
      })
    },
  })

  server.channel<{ id: string }, { character: CharacterDocument | null }>(
    characterChannel.path,
    {
      async access(ctx) {
        if (ctx.userId === GUEST_USER) return false

        await characterQueue.waitCurrentTasks(ctx.params.id)

        const character = await Character.findById(ctx.params.id).exec()
        ctx.data.character = character

        return ctx.userId === character?.userId?.toString()
      },
      async load(ctx) {
        if (ctx.data.character) {
          ctx.sendBack(characterActions.load(ctx.data.character.toObject()))
        }
      },
    },
  )

  server.type(characterActions.create, {
    access(ctx) {
      return ctx.userId !== GUEST_USER
    },
    async process(ctx, action) {
      const { _id, name } = action.payload
      await new Character({
        _id,
        name,
        userId: mongoose.Types.ObjectId(ctx.userId),
      }).save()
    },
    async resend(ctx) {
      return { user: ctx.userId }
    },
  })

  const characterType = createCharacterType(server)

  characterType(
    characterActions.delete,
    {
      async process(ctx) {
        await ctx.data.character.remove()
      },
    },
    { saveCharacter: false },
  )

  keys(characterUpdaters).forEach((key) =>
    characterType(characterActions[key], characterUpdaters[key]),
  )
}
