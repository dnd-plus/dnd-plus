/* eslint-disable import/first */

// load env before imports
require('dotenv').config()

import { createServer } from 'createServer'
import express from 'express'
import path from 'path'

// run
;(async function () {
  // app to serve static 1
  const app = express()

  const staticDir = path.join(__dirname, '../../client/build')

  app.use(express.static(staticDir, { index: false }))
  app.get('*', function (_, response) {
    response.sendFile(path.resolve(staticDir, 'index.html'))
  })

  const httpServer = await app.listen(process.env.PORT || 80)

  // hack to prevent logux rewrite routes
  const _on = httpServer.on
  httpServer.on = (event: any, listener: any) => {
    if (event === 'request') return httpServer
    return _on.call(httpServer, event, listener)
  }

  // logux server
  const loguxServer = await createServer({
    server: httpServer,
  })
  await loguxServer.listen()

  process.send?.('ready')
})()
