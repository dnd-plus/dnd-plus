import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createObjectId } from 'common/utils/createObjectId'
import { dateUTCNow } from 'common/utils/dateUTCNow'
import { IdPayloadAction } from 'common/types/Utils/IdPayloadAction'

export const {
  name: characterReducerName,
  reducer: characterReducer,
  caseReducers: characterCaseReducers,
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
    setName(state, { payload }: IdPayloadAction<{ name: string }>) {
      state[payload._id].name = payload.name
    },
  },
})
