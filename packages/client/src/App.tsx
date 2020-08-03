import { hot } from 'react-hot-loader/root'
import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { Pages } from 'pages/Pages'

function App() {
  return (
    <>
      <CssBaseline />
      <Pages />
    </>
  )
}

export default hot(App)
