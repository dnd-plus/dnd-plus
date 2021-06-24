import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from 'redux/configureStore'
import { Provider as ReduxProvider } from 'react-redux'
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider as MuiStylesProvider,
} from '@material-ui/core'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { badge, badgeRu, log } from '@logux/client'
import { badgeStyles } from '@logux/client/badge/styles'
import theme from './theme'
import { configure } from 'mobx'

const store = configureStore()

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: false,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
})

badge(store.client, { messages: badgeRu, styles: badgeStyles })

declare global {
  interface Window {
    store: any
  }
}

if (process.env.NODE_ENV !== 'production') {
  log(store.client)

  window.store = store
}

ReactDOM.render(
  <BrowserRouter>
    <ReduxProvider store={store}>
      <MuiStylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <App />
          </StyledThemeProvider>
        </MuiThemeProvider>
      </MuiStylesProvider>
    </ReduxProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
