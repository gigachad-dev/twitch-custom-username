// import { TRPCError } from '@trpc/server'

import { sql } from '@databases/sqlite'
import { z } from 'zod'
import { db } from '../db.js'
import { publicProcedure, router } from '../trpc.js'

export interface Post {
  id: number
  title: string
}

export const postsRouter = router({
  create: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // if (ctx.user.name !== 'nyan') {
      //   throw new TRPCError({ code: 'UNAUTHORIZED' })
      // }

      const post = await db.query(
        sql`INSERT INTO ${sql.ident('posts')} (title) VALUES (${input.title})`
      )

      return post
    }),

  list: publicProcedure.query(async (): Promise<Post[]> => {
    const posts = await db.query(sql`SELECT * FROM ${sql.ident('posts')}`)
    return posts
  }),

  reset: publicProcedure.mutation(async () => {
    await db.query(sql`DELETE FROM ${sql.ident('posts')}`)
  })
})
