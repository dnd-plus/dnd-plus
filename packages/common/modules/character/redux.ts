import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createObjectId } from 'common/utils/createObjectId'
import { dateUTCNow } from 'common/utils/dateUTCNow'
import { IdPayloadAction } from 'common/modules/redux/IdPayloadAction'
import { AbilitiesMap } from 'common/reference/AbilityType'
import { extendType } from '../../utils/extendType'

export const BASE_ABILITIES_STATE_TYPES = [
  'standardArray',
  'pointBuy',
  'manual',
] as const

export type BaseAbilitiesStateType = typeof BASE_ABILITIES_STATE_TYPES[number]

export type BaseAbilitiesState = {
  type: BaseAbilitiesStateType
  abilities: Partial<AbilitiesMap>
  createdAt?: number
  updatedAt?: number
}

export type CharacterRaceState = {
  type: string
  createdAt?: number
  updatedAt?: number
  choices?: Record<string, unknown>
}

export type CharacterState = {
  _id: string
  name: string
  userId: string
  createdAt?: number
  updatedAt?: number
  baseAbilities?: BaseAbilitiesState
  race?: CharacterRaceState
}

export type WithCharacterReducer<
  Action extends IdPayloadAction<any> = IdPayloadAction<any>
> = (this: void, character: CharacterState, action: Action) => void

export const characterUpdaters = extendType<
  Record<string, WithCharacterReducer>
>()({
  // NAME
  setName(character, { payload }: IdPayloadAction<{ name: string }>) {
    if (payload.name) character.name = payload.name
  },

  // BASE ABILITIES
  setBaseAbilitiesType(
    character,
    { payload }: IdPayloadAction<{ type: BaseAbilitiesStateType }>,
  ) {
    if (payload.type === character.baseAbilities?.type) return

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
      character.baseAbilities = withDate({
        ...character.baseAbilities,
        abilities: payload.abilities,
      })
    }
  },

  // RACE
  setRace(character, { payload }: IdPayloadAction<{ type: string }>) {
    if (character.race?.type === payload.type) return

    character.race = withDate({
      type: payload.type,
      choices: {},
    })
  },

  setRaceChoice(
    character,
    { payload }: IdPayloadAction<{ key: string | number; value: unknown }>,
  ) {
    if (!character.race) return
    if (!character.race.choices) character.race.choices = {}

    character.race.choices = {
      ...character.race.choices,
      [payload.key]: payload.value,
    }
  },
})

type GameUpdaters = typeof characterUpdaters

const withGame = <Action extends IdPayloadAction>(
  withGameReducer: WithCharacterReducer<Action>,
) => (state: ReducerState, action: Action) => {
  const characterState = state[action.payload._id]

  if (characterState) {
    withGameReducer(characterState, action)
  }
}

type ReducerState = Record<string, CharacterState>

type WithCharacter<GameUpdater extends WithCharacterReducer<any>> = (
  state: ReducerState,
  action: GameUpdater extends WithCharacterReducer<infer Action>
    ? Action
    : never,
) => void

const withCharacterReducers = {} as {
  [K in keyof GameUpdaters]: WithCharacter<GameUpdaters[K]>
}
;(Object.keys(characterUpdaters) as (keyof GameUpdaters)[]).forEach((key) => {
  withCharacterReducers[key] = withGame(
    characterUpdaters[key] as WithCharacterReducer<any>,
  )
})

export const {
  name: charactersReducerName,
  reducer: charactersReducer,
  caseReducers: charactersCaseReducers,
  actions: characterActions,
} = createSlice({
  name: 'characters',
  initialState: {} as ReducerState,
  reducers: {
    ...withCharacterReducers,
    load(state, { payload }: PayloadAction<CharacterState>) {
      state[payload._id] = payload
    },
    create: {
      prepare({ name, userId }: { name: string; userId: string }) {
        return {
          payload: withDate({
            name,
            userId,
            _id: createObjectId(),
          }),
        }
      },
      reducer(state, { payload }: PayloadAction<CharacterState>) {
        state[payload._id] = payload
      },
    },
    delete(state, { payload }: IdPayloadAction) {
      delete state[payload._id]
    },
  },
})

function withDate<T extends {}>(data: T) {
  const UTCNow = dateUTCNow()

  return Object.assign({ createdAt: UTCNow }, data, { updatedAt: UTCNow })
}
