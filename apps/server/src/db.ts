import connect, { sql } from '@databases/sqlite'

export const db = connect('db.sqlite', {
  verbose: true
})

await db.query(sql`CREATE TABLE IF NOT EXISTS ${sql.ident('users')} (
  id INTEGER PRIMARY KEY,
  name TEXT
)`)

await db.query(sql`CREATE TABLE IF NOT EXISTS ${sql.ident('posts')} (
  id INTEGER PRIMARY KEY,
  title TEXT
)`)
