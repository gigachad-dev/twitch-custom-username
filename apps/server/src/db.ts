import connect, { sql } from '@databases/sqlite'

export const db = connect('db.sqlite', {
  verbose: true
})

await db.query(sql`CREATE TABLE IF NOT EXISTS ${sql.ident('users')} (
  id INTEGER PRIMARY KEY,
  userId text,
  name text
)`)
