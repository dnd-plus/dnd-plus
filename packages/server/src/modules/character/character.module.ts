import Server from '@logux/server/server'
import {
  characterChannel,
  currentUserCharactersChannel,
} from 'common/modules/character/channels'
import { GUEST_USER } from 'common/modules/user/redux'
import {
  Character,
  CharacterDocument,
} from 'modules/character/character.schema'
import { characterActions } from 'common/modules/character/redux'
import { mongoose } from '@typegoose/typegoose'
import { createCharacterType } from 'modules/character/createCharacterType'

module.exports = function characterModule(server: Server) {
  server.channel(currentUserCharactersChannel.path, {
    access() {
      return true
    },
    async load(ctx) {
      if (ctx.userId === GUEST_USER) return

      const characters = await Character.find({ userId: ctx.userId }).exec()

      characters.forEach((character) => {
        ctx.sendBack(characterActions.load(character.toObject()))
      })
    },
  })

  server.channel<{ id: string }, { character: CharacterDocument | null }>(
    characterChannel.path,
    {
      async access(ctx) {
        const character = await Character.findById(ctx.params.id).exec()
        ctx.data.character = character

        return ctx.userId === character?.userId?.toString()
      },
      async load(ctx) {
        if (ctx.userId === GUEST_USER) return

        const characters = await Character.find({ user: ctx.userId }).exec()

        characters.forEach((character) => {
          ctx.sendBack(characterActions.load(character.toObject()))
        })
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

  characterType(characterActions.setName, {
    async process(ctx, { payload: { name } }, meta) {
      if (!name) {
        server.undo(meta)
        return
      }
      const { character } = ctx.data
      character.name = name

      await character.save()
    },
  })

  characterType(characterActions.delete, {
    async process(ctx) {
      await ctx.data.character.remove()
    },
  })
}
