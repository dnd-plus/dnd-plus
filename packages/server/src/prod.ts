// load env before imports
require('dotenv').config()

import { createServer } from 'createServer'
import express from 'express'
import path from 'path'

// run
;(async function () {
  // app to serve static
  const app = express()

  const staticDir = path.join(__dirname, '../../client/build')

  app.use(express.static(staticDir, { index: false }))
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(staticDir, 'index.html'))
  })

  await app.listen(
    parseInt(process.env.PORT as string) || 80,
    process.env.HOST || '127.0.0.1',
  )

  // logux server
  const server = await createServer({
    port: parseInt(process.env.LOGUX_PORT as string),
    host: process.env.HOST || '127.0.0.1',
  })
  await server.listen()
})()
