import { hot } from 'react-hot-loader/root'
import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { Pages } from 'pages/Pages'
import { Header } from 'components/Header'
import { GlobalLoader } from 'components/GlobalLoader'

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <GlobalLoader />
      <Pages />
    </>
  )
}

export default hot(App)
