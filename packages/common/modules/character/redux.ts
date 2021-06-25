import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createObjectId } from 'common/utils/createObjectId'
import { dateUTCNow } from 'common/utils/dateUTCNow'
import { IdPayloadAction } from 'common/modules/redux/IdPayloadAction'
import { AbilitiesMap } from 'common/reference/AbilityType'
import {
  CharacterClassName,
  CharacterTypeRecord,
} from 'common/types/base/character/CharacterClassName'
import { keys } from 'common/utils/typesafe'
import {
  characterUpdaters,
  WithCharacterReducer,
} from 'common/modules/character/characterUpdaters'

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

export type CharacterClassState = {
  type: CharacterClassName
  level: Array<number>
  createdAt?: number
  updatedAt?: number
  choices?: Record<string, unknown>
}

export type CharacterState = {
  readonly _id: string
  name: string
  userId: string
  createdAt?: number
  updatedAt?: number
  baseAbilities?: BaseAbilitiesState
  race?: CharacterRaceState
  classes?: CharacterTypeRecord<CharacterClassState>
}

type CharacterUpdaters = typeof characterUpdaters

const withCharacter =
  <Action extends IdPayloadAction>(
    withCharacterReducer: WithCharacterReducer<Action>,
  ) =>
  (state: ReducerState, action: Action) => {
    const characterState = state[action.payload._id]

    if (characterState) {
      withCharacterReducer(characterState, action)
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
  [K in keyof CharacterUpdaters]: WithCharacter<CharacterUpdaters[K]>
}
keys(characterUpdaters).forEach((key) => {
  withCharacterReducers[key] = withCharacter(
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
    setName(state, { payload }: IdPayloadAction<{ name: string }>) {
      const character = state[payload._id]
      if (payload.name && character) {
        character.name = payload.name
      }
    },
  },
})

export function withDate<T extends {}>(data: T) {
  const UTCNow = dateUTCNow()

  return Object.assign({ createdAt: UTCNow }, data, { updatedAt: UTCNow })
}
