import { USERS_ENDPOINT } from './constants.js'

interface UserInfo {
  error?: string
  id: string
  displayName: string
}

export async function getUserInfo(username: string): Promise<UserInfo> {
  const response = await fetch(USERS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username })
  })

  return await response.json()
}
