import { getDefaultMiddleware, applyMiddleware } from '@reduxjs/toolkit'
import { createLoguxCreator } from '@logux/redux'
import { rootReducer } from 'common/modules/redux/rootReducer'
import { GUEST_USER, userActions } from 'common/modules/user/redux'
import { PROFILE_PAGE, LOGIN_PAGE } from 'constants/routes'

export const configureStore = () => {
  const createStore = createLoguxCreator({
    subprotocol: '1.0.0',
    server:
      process.env.NODE_ENV === 'development'
        ? 'ws://localhost:31337'
        : `ws://${process.env.REACT_APP_LOGUX_URL}`,
    allowDangerousProtocol: true,
    userId: localStorage.getItem('userId') || GUEST_USER,
    token: localStorage.getItem('token') || '',
  })

  const store = createStore(
    rootReducer,
    applyMiddleware(...getDefaultMiddleware()),
  )

  store.client.on('add', (action) => {
    if (action.type === userActions.done.type) {
      localStorage.setItem('userId', action.payload.login)
      localStorage.setItem('token', action.payload.token)
      window.location.href = PROFILE_PAGE.replace(
        ':login',
        action.payload.login,
      )
    }
  })

  store.client.node.on('error', (error: any) => {
    if (error.type === 'wrong-credentials') {
      localStorage.removeItem('userId')
      localStorage.removeItem('token')
      window.location.href = LOGIN_PAGE
    }
  })

  store.client.start()

  return store
}

declare global {
  type AppStore = ReturnType<typeof configureStore>

  type AppState = ReturnType<AppStore['getState']>

  // type AppDispatch = typeof store.dispatch

  // type AppAction = AppDispatch extends (a: infer A) => any ? A : never
}

// declare module 'redux' {
//   interface Store extends AppStore {}
// }

declare module 'react-redux' {
  interface DefaultRootState extends AppState {}

  function useStore(): AppStore
  function useDispatch(): AppStore['dispatch']
}
