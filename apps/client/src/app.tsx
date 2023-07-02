import { useRef, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import { trpc } from './trpc'

export function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: 'http://localhost:3002/trpc',
          async headers() {
            return {
              username: 'nyan',
              'content-type': 'application/json'
            }
          }
        })
      ]
    })
  )

  return (
    <trpc.Provider
      client={trpcClient}
      queryClient={queryClient}
    >
      <QueryClientProvider client={queryClient}>
        <Posts />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

function Posts() {
  const inputRef = useRef<HTMLInputElement>(null)

  const postsQuery = trpc.posts.list.useQuery()
  const createPostMutation = trpc.posts.create.useMutation()
  const resetPostsMutation = trpc.posts.reset.useMutation()

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a post"
        onKeyDown={async (event) => {
          if (event.key === 'Enter') {
            if (!inputRef.current?.value) return
            event.preventDefault()
            await createPostMutation.mutateAsync({
              title: inputRef.current.value
            })
            inputRef.current!.value = ''
            await postsQuery.refetch()
          }
        }}
      />
      <button
        onClick={async () => {
          await resetPostsMutation.mutateAsync()
          await postsQuery.refetch()
        }}
      >
        Reset
      </button>
      <h1>Posts</h1>
      <ul>
        {postsQuery.data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}
