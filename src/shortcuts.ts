import { CHAT_DISPLAY_NAME, DATA_USER_ID } from './constants.js'
import { getUserInfo } from './get-user-info.js'
import { reactInstanceReader } from './react-instance-reader.js'
import { storage } from './storage.js'

function exportConfig(event: KeyboardEvent): void {
  if (event.altKey && event.key === '1') {
    event.preventDefault()
    navigator.clipboard
      .writeText(JSON.stringify(storage.values))
      .then(() => alert('Copied to clipboard!'))
  }
}

function importConfig(event: KeyboardEvent): void {
  if (event.altKey && event.key === '2') {
    event.preventDefault()

    const promptResult = prompt(
      'Set a new storage value:',
      JSON.stringify(storage.values)
    )
    if (!promptResult) return

    try {
      storage.write(JSON.parse(promptResult))
    } catch (err) {
      alert(`Failed to parse JSON: ${(err as Error).message}`)
    }
  }
}

function addCustomUsernameFromChat(event: MouseEvent): void {
  const el = event.target as HTMLElement

  if (event.altKey && el.classList.contains(CHAT_DISPLAY_NAME)) {
    event.preventDefault()

    const userId =
      reactInstanceReader.getUserId(el) ||
      el.parentElement!.parentElement!.getAttribute(DATA_USER_ID) ||
      el.parentElement!.parentElement!.parentElement!.getAttribute(DATA_USER_ID)

    if (!userId) {
      alert('User id is not defined')
      return
    }

    const user = storage.getCustomNameById(userId)
    const promptResult = prompt(
      `Set a custom name for ${el.textContent}:`,
      user ?? ''
    )
    if (promptResult === null) return

    storage.addCustomName([userId, promptResult])
  }
}

async function addCustomUsername(event: KeyboardEvent): Promise<void> {
  if (event.altKey && event.key === '3') {
    event.preventDefault()

    const usernamePrompt = prompt('Search user by name:')
    if (!usernamePrompt) return

    searchUser(event, usernamePrompt)
  }
}

async function searchUser(
  event: KeyboardEvent,
  usernamePrompt: string
): Promise<void> {
  const userInfo = await getUserInfo(usernamePrompt)
  if (userInfo.error) {
    alert(userInfo.error)
    return addCustomUsername(event)
  }

  const currentCustomName = storage.getCustomNameById(userInfo.id)
  const customUsernamePrompt = prompt(
    `Set a custom name for ${userInfo.displayName}:`,
    currentCustomName ?? ''
  )

  if (customUsernamePrompt === null) return
  storage.addCustomName([userInfo.id, customUsernamePrompt])
}

export const shortcuts = {
  exportConfig,
  importConfig,
  addCustomUsernameFromChat,
  addCustomUsername
}
