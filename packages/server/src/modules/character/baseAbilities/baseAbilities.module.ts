import { Server } from '@logux/server'
import { createCharacterType } from 'modules/character/createCharacterType'
import { characterActions } from 'common/modules/character/redux'

module.exports = function (server: Server) {
  const characterType = createCharacterType(server)

  characterType(characterActions.setBaseAbilitiesType, {
    async process(ctx, { payload }) {
      const { character } = ctx.data

      character.baseAbilities = {
        type: payload.type,
        abilities: {},
      }
      await character.save()
    },
  })

  characterType(characterActions.setBaseAbilities, {
    async process(ctx, { payload }) {
      const { character } = ctx.data
      if (!character.baseAbilities) return

      character.baseAbilities.abilities = payload.abilities
      await character.save()
    },
  })
}
