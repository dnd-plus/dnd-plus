import { createAction, createSlice } from '@reduxjs/toolkit'
import { IdPayloadAction } from 'common/modules/redux/IdPayloadAction'

export const GUEST_USER = 'guest'

export interface UserState {
  _id: string
  login: string
}

export const {
  name: userReducerName,
  reducer: userReducer,
  caseReducers: userCaseReducers,
  actions: userClientActions,
} = createSlice({
  name: 'user',
  initialState: null as UserState | null,
  reducers: {
    load(_, { payload }: IdPayloadAction<UserState>) {
      return payload
    },
  },
})

export const userServerActions = {
  done: createAction<{ userId: string; token: string }>('user/done'),
  register: createAction<{ login: string; email: string; password: string }>(
    'user/register',
  ),
  login: createAction<{ login: string; password: string }>('user/login'),
  logout: createAction('user/logout'),
}

export const userActions = {
  ...userClientActions,
  ...userServerActions,
}
