import { apiRouter } from './api/api.js'
import { postsRouter } from './api/posts.js'
import { subRouter } from './api/sub.js'
import { router } from './trpc'

export const appRouter = router({
  posts: postsRouter,
  sub: subRouter,
  api: apiRouter
})

export type AppRouter = typeof appRouter
