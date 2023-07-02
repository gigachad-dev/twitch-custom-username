import { createServer } from './server'

const server = createServer({
  dev: false,
  port: 3002,
  prefix: '/trpc'
})

void server.start()
