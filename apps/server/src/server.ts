import ws from '@fastify/websocket'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import fastify from 'fastify'
import { createContext } from './context'
import { appRouter } from './router'

export interface ServerOptions {
  dev?: boolean
  port?: number
  prefix?: string
}

export function createServer(opts: ServerOptions) {
  const dev = opts.dev ?? true
  const port = opts.port ?? 3000
  const prefix = opts.prefix ?? '/trpc'
  const server = fastify({ logger: dev })

  void server.register(ws)
  void server.register(fastifyTRPCPlugin, {
    prefix,
    useWSS: true,
    trpcOptions: {
      router: appRouter,
      createContext
    }
  })

  server.get('/', () => {
    return { hello: 'wait-on 💨' }
  })

  const stop = async () => {
    await server.close()
  }

  const start = async () => {
    try {
      const serverAddress = await server.listen({ host: '127.0.0.1', port })
      console.log('Server listening on:', serverAddress)
    } catch (err) {
      server.log.error(err)
      process.exit(1)
    }
  }

  return { server, start, stop }
}
