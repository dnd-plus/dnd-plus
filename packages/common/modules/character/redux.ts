import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createObjectId } from 'common/utils/createObjectId'
import { dateUTCNow } from 'common/utils/dateUTCNow'
import { IdPayloadAction } from 'common/modules/redux/IdPayloadAction'

export interface CharacterState {
  _id: string
  name: string
  userId: string
  createdAt: number
  updatedAt: number
  race?: {
    type: string
    createdAt: number
    updatedAt: number
    choices: Record<string, unknown>
  }
}

export const {
  name: charactersReducerName,
  reducer: charactersReducer,
  caseReducers: charactersCaseReducers,
  actions: characterActions,
} = createSlice({
  name: 'characters',
  initialState: {} as Record<string, CharacterState>,
  reducers: {
    load(state, { payload }: PayloadAction<CharacterState>) {
      state[payload._id] = payload
    },
    create: {
      prepare({ name, userId }: { name: string; userId: string }) {
        const UTCNow = dateUTCNow()

        return {
          payload: {
            name,
            userId,
            createdAt: UTCNow,
            updatedAt: UTCNow,
            _id: createObjectId(),
          },
        }
      },
      reducer(state, { payload }: PayloadAction<CharacterState>) {
        state[payload._id] = payload
      },
    },
    delete(state, { payload }: IdPayloadAction) {
      delete state[payload._id]
    },
    setName: checkCharacter(
      (character, { payload }: IdPayloadAction<{ name: string }>) => {
        if (payload.name) character.name = payload.name
      },
    ),
    setRace: checkCharacter(
      (character, { payload }: IdPayloadAction<{ type: string }>) => {
        if (character.race?.type === payload.type) return

        const UTCNow = dateUTCNow()

        character.race = {
          type: payload.type,
          createdAt: UTCNow,
          updatedAt: UTCNow,
          choices: {},
        }
      },
    ),
    setRaceChoice: checkCharacter(
      (
        character,
        { payload }: IdPayloadAction<{ key: string | number; value: unknown }>,
      ) => {
        if (!character.race) return
        if (!character.race.choices) character.race.choices = {}

        character.race.choices[payload.key] = payload.value
      },
    ),
  },
})

function checkCharacter<A extends IdPayloadAction>(
  reducer: (state: CharacterState, action: A) => CharacterState | null | void,
) {
  function checkCharacterReducer(
    state: Record<string, CharacterState>,
    action: A,
  ) {
    const character = state[action.payload._id]
    if (!character) return

    const nextCharacter = reducer(character, action)
    if (nextCharacter) {
      state[action.payload._id] = nextCharacter
    } else if (nextCharacter === null) {
      delete state[action.payload._id]
    }
  }

  checkCharacterReducer.inner = reducer

  return checkCharacterReducer
}
