import { Server } from '@logux/server'
import { createCharacterType } from 'modules/character/createCharacterType'
import { characterActions } from 'common/modules/character/redux'

module.exports = function (server: Server) {
  const characterType = createCharacterType(server)

  characterType(characterActions.setRace, {
    async process(ctx, { payload }) {
      const { character } = ctx.data

      character.race = {
        type: payload.type,
        choices: {},
      }
      character.markModified('race.choices')
      await character.save()
    },
  })

  characterType(characterActions.setRaceChoice, {
    async process(ctx, { payload }) {
      const { character } = ctx.data
      if (!character.race) return

      character.race.choices = {
        ...character.race.choices,
        [payload.key]: payload.value,
      }
      character.markModified(`race.choices.${payload.key}`)
      await character.save()
    },
  })
}
