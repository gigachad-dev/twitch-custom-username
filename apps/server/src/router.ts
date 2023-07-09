import { postsRouter } from './api/users.js'
import { router } from './trpc'

export const appRouter = router({
  users: postsRouter
})

export type AppRouter = typeof appRouter
