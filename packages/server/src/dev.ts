// load env before imports
require('dotenv').config()

// eslint-disable-next-line import/first
import { createServer } from 'createServer'
;(async function () {
  const server = await createServer({
    host: '0.0.0.0',
    port: 31337,
  })

  await server.listen()
})()
