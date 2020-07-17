import { combineReducers } from '@reduxjs/toolkit'
import {
  useDispatch,
  useStore,
  useSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import { createLoguxCreator } from '@logux/redux'
import { app } from './app'

export const rootReducer = combineReducers({
  app: app.reducer,
})

const createStore = createLoguxCreator({
  subprotocol: '1.0.0',
  server:
    process.env.NODE_ENV === 'development'
      ? 'ws://localhost:31337'
      : 'wss://logux.example.com',
  userId: 'todo', // TODO: We will fill it in next chapter
  token: '', // TODO: We will fill it in next chapter
})

export const store = createStore(rootReducer)

export type AppStore = typeof store

export type AppState = ReturnType<AppStore['getState']>

export type AppDispatch = typeof store.dispatch

export type AppAction = AppDispatch extends (a: infer A) => any ? A : never

export const useAppDispatch = () => useDispatch<AppDispatch>()

// @ts-ignore
export const useAppStore: () => typeof store = useStore

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
