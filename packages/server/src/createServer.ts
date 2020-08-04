import { Server, ServerOptions } from '@logux/server'
import { mongoose } from '@typegoose/typegoose'

export async function createServer(serverOptions?: ServerOptions) {
  // db init
  await mongoose.connect('mongodb://localhost/dnd', { useNewUrlParser: true })

  // server init
  const server = new Server(
    Server.loadOptions(process, {
      subprotocol: '1.0.0',
      supports: '1.x',
      root: __dirname,
      ...serverOptions,
    }),
  )

  // @ts-ignore
  await server.autoloadModules(['modules/**/*.module.ts'])

  return server
}
