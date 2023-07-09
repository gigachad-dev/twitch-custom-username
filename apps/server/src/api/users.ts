import { sql } from '@databases/sqlite'
import { z } from 'zod'
import { db } from '../db.js'
import { publicProcedure, router } from '../trpc.js'

export interface User {
  id: number
  userId: string
  name: string
}

export const postsRouter = router({
  create: publicProcedure
    .input(z.object({ userId: z.string(), name: z.string() }))
    .mutation(async ({ input }) => {
      const user = await db.query(
        sql`INSERT INTO ${sql.ident('users')} (userId, name) VALUES (${
          input.userId
        }, ${input.name})`
      )

      return user
    }),

  list: publicProcedure.query(async (): Promise<User[]> => {
    const users = await db.query(sql`SELECT * FROM ${sql.ident('users')}`)
    return users
  }),

  reset: publicProcedure.mutation(async () => {
    await db.query(sql`DELETE FROM ${sql.ident('users')}`)
  })
})
