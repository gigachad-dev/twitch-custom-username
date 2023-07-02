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
          },
          fetch(url, options) {
            return fetch(url, {
              ...options,
              mode: 'no-cors'
            })
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
  const createPostMutation = trpc.posts.create.useMutation({
    onMutate: (data) => {
      if (!data.title) return
    },
    onSuccess: () => {
      inputRef.current!.value = ''
    }
  })

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a post"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            createPostMutation.mutate({ title: inputRef.current!.value })
          }
        }}
      />
      <h1>Posts</h1>
      <ul>
        {postsQuery.data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}
