import { USERSCRIPT_API } from './constants.js'
import type { User } from './storage.js'

interface UserInfo {
  error?: string
  id: string
  displayName: string
}

export async function getUserInfo(username: string): Promise<UserInfo> {
  const url = new URL('/check-user', USERSCRIPT_API)
  url.searchParams.set('username', username)

  const response = await fetch(url)
  const userInfo = await response.json()
  return userInfo
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(USERSCRIPT_API + '/users')
  const users = await response.json()
  return users
}

export async function writeUserCustomName(
  user: User & { password: string }
): Promise<void> {
  const response = await fetch(USERSCRIPT_API + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  await response.json()
}
