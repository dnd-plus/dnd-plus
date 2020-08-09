import { combineReducers } from '@reduxjs/toolkit'
import { characterReducer } from '../character/redux'
import { userReducer } from '../user/redux'

export const rootReducer = combineReducers({
  character: characterReducer,
  user: userReducer,
})
