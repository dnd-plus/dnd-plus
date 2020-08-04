// load env before imports
require('dotenv').config()

import { createServer } from 'createServer'

;(async function () {
  const server = await createServer()

  await server.listen()
})()
