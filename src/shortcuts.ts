import { getUserInfo } from './api.js'
import { CHAT_DISPLAY_NAME, DATA_USER_ID } from './constants.js'
import { passwordManager } from './password-manager.js'
import { reactInstanceReader } from './react-instance-reader.js'
import { storage } from './storage.js'

function addCustomUsernameFromChat(event: MouseEvent): void {
  const el = event.target as HTMLElement

  if (event.altKey && el.classList.contains(CHAT_DISPLAY_NAME)) {
    event.preventDefault()

    const userId =
      reactInstanceReader.getUserId(el) ||
      el.parentElement!.parentElement!.getAttribute(DATA_USER_ID) ||
      el.parentElement!.parentElement!.parentElement!.getAttribute(DATA_USER_ID)

    if (!userId) {
      alert('Не найден userId.')
      return
    }

    const user = storage.getCustomNameById(userId)
    const promptResult = prompt(
      `Укажите имя для пользователя ${el.textContent}:`,
      user ?? ''
    )
    if (promptResult === null) return

    storage.addCustomName({ id: userId, name: promptResult })
  }
}

async function addCustomUsername(event: KeyboardEvent): Promise<void> {
  if (event.altKey && event.key === '3') {
    event.preventDefault()

    const usernamePrompt = prompt('Поиск пользователя по никнейму:')
    if (!usernamePrompt) return

    await searchUser(event, usernamePrompt)
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
    `Укажите имя для пользователя ${userInfo.displayName}:`,
    currentCustomName ?? ''
  )

  if (customUsernamePrompt === null) return

  try {
    await storage.addCustomName({ id: userInfo.id, name: customUsernamePrompt })
  } catch (err) {
    alert((err as Error).message)
  }
}

export function editPassword(event: KeyboardEvent) {
  if (event.altKey && event.key === '2') {
    event.preventDefault()

    const password = prompt('Укажите пароль для доступа к API:')
    if (!password) return

    passwordManager.write(password)
  }
}

export const shortcuts = {
  addCustomUsernameFromChat,
  addCustomUsername,
  editPassword
}
