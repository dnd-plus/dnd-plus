import { combineReducers } from '@reduxjs/toolkit'
import { charactersReducer } from '../character/redux'
import { userReducer } from '../user/redux'

export const rootReducer = combineReducers({
  characters: charactersReducer,
  user: userReducer,
})
