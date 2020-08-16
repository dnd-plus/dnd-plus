import { hot } from 'react-hot-loader/root'
import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { Pages } from 'pages/Pages'
import { Header } from 'components/Header'
import { GlobalLoader } from 'components/GlobalLoader'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    overflow-y: scroll;
  }
`

function App() {
  return (
    <>
      <GlobalStyles />
      <CssBaseline />
      <Header />
      <GlobalLoader />
      <Pages />
    </>
  )
}

export default hot(App)
