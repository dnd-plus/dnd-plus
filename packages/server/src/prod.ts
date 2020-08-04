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
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(staticDir, 'index.html'))
  })

  await app.listen(80, '127.0.0.1')

  // logux server
  const server = await createServer()
  await server.listen()
})()
