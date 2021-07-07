import { extendType } from 'common/utils/extendType'
import { IdPayloadAction } from 'common/modules/redux/IdPayloadAction'
import { AbilitiesMap } from 'common/reference/AbilityType'
import {
  BaseAbilitiesStateType,
  CharacterState,
  withDate,
} from 'common/modules/character/redux'
import { CharacterClassName } from 'common/types/base/character/CharacterClassName'
import { dateUTCNow } from 'common/utils/dateUTCNow'

export type WithCharacterReducer<
  Action extends IdPayloadAction<any> = IdPayloadAction<any>,
> = (this: void, character: CharacterState, action: Action) => void

export const characterUpdaters = extendType<
  Record<string, WithCharacterReducer>
>()({
  setName(character, { payload: { name } }: IdPayloadAction<{ name: string }>) {
    if (name) {
      character.name = name
    }
  },
  // BASE ABILITIES
  setBaseAbilitiesType(
    character,
    { payload }: IdPayloadAction<{ type: BaseAbilitiesStateType }>,
  ) {
    if (payload.type === character.baseAbilities?.type) {
      return
    }

    character.baseAbilities = withDate({
      type: payload.type,
      abilities: {},
    })
  },

  setBaseAbilities(
    character,
    { payload }: IdPayloadAction<{ abilities: Partial<AbilitiesMap> }>,
  ) {
    if (character.baseAbilities) {
      character.baseAbilities.abilities = payload.abilities
    }
  },

  // RACE
  setRace(character, { payload }: IdPayloadAction<{ type: string }>) {
    if (character.race?.type === payload.type) {
      return
    }

    character.race = withDate({
      type: payload.type,
      choices: {},
    })
  },

  setRaceChoice(
    character,
    { payload }: IdPayloadAction<{ key: string | number; value: unknown }>,
  ) {
    if (!character.race) {
      return
    }
    if (!character.race.choices) {
      character.race.choices = {}
    }

    character.race.choices = {
      ...character.race.choices,
      [payload.key]: payload.value,
    }
  },

  setClass(
    character,
    { payload: { type } }: IdPayloadAction<{ type: CharacterClassName }>,
  ) {
    if (!character.classes) {
      character.classes = {}
    }
    if (character.classes[type]) {
      return
    }
    character.classes[type] = withDate({ type, level: [dateUTCNow()] })
  },

  updateClassLevel(
    character,
    {
      payload: { type, to },
    }: IdPayloadAction<{
      type: CharacterClassName
      to: 'up' | 'down'
    }>,
  ) {
    const classItem = character.classes?.[type]
    if (!classItem) {
      return
    }
    const level = classItem.level.length + (to === 'up' ? 1 : -1)

    if (level <= 0) {
      character.classes![type] = undefined
      delete character.classes![type]
    } else {
      classItem.level = [...Array(level)].map((_, index) =>
        classItem.level.length > index ? classItem.level[index] : dateUTCNow(),
      )
    }
  },

  setClassChoice(
    character,
    {
      payload: { type, key, value },
    }: IdPayloadAction<{
      type: CharacterClassName
      key: string | number
      value: unknown
    }>,
  ) {
    const classItem = character.classes?.[type]
    if (!classItem) {
      return
    }

    classItem.choices = {
      ...classItem.choices,
      [key]: value,
    }
  },
})
