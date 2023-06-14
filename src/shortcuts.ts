import { CHAT_DISPLAY_NAME, DATA_USER_ID } from './constants.js'
import { reactInstanceReader } from './react-instance-reader.js'
import { storage } from './storage.js'

function exportConfig(event: KeyboardEvent) {
  if (event.altKey && event.code === 'KeyQ') {
    event.preventDefault()
    navigator.clipboard
      .writeText(JSON.stringify(storage.values))
      .then(() => alert('Copied to clipboard!'))
  }
}

function importConfig(event: KeyboardEvent) {
  if (event.altKey && event.code === 'KeyW') {
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

function addCustomUsername(event: MouseEvent) {
  const el = event.target as HTMLElement

  // Alt + RBM
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

export const shortcuts = {
  exportConfig,
  importConfig,
  addCustomUsername
}
