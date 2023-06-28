import connect, { sql } from '@databases/sqlite'
import Fastify from 'fastify'

const db = connect('db.sqlite', {
  verbose: true
})

await db.query(sql`CREATE TABLE IF NOT EXISTS ${sql.ident('users')} (
  id INTEGER PRIMARY KEY,
  name TEXT
)`)

const app = Fastify()

app.get('/', async (request, reply) => {
  const users = await db.query(sql`SELECT * FROM ${sql.ident('users')}`)
  reply.send(users)
})

app.post<{ Body: { name: string } }>('/', async (request, reply) => {
  const user = request.body
  await db.query(
    sql`INSERT INTO ${sql.ident('users')} (name) VALUES (${user.name})`
  )
  reply.send(user)
})

app.listen({ host: '127.0.0.1', port: 3005 }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  console.log(address)
})
