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

  const usersQuery = trpc.users.list.useQuery()
  const createUserMutation = trpc.users.create.useMutation()
  const resetUsersMutation = trpc.users.reset.useMutation()

  const handleCreateUser = async () => {
    if (!inputRef.current?.value) return
    await createUserMutation.mutateAsync({
      userId: '1',
      name: inputRef.current.value
    })
    await usersQuery.refetch()
    inputRef.current!.value = ''
  }

  return (
    <div>
      <form>
        <label>
          Name:
          <input
            ref={inputRef}
            type="text"
            placeholder="Add user"
          />
        </label>
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault()
            handleCreateUser()
          }}
        >
          Add
        </button>
        <button
          onClick={async (event) => {
            event.preventDefault()
            await resetUsersMutation.mutateAsync()
            await usersQuery.refetch()
          }}
        >
          Reset
        </button>
      </form>
      <h1>Users</h1>
      <ul>
        {usersQuery.data?.map((post) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
    </div>
  )
}
