import { observeElement } from '@zero-dependency/dom'
import {
  CHAT_DISPLAY_NAME,
  CHAT_LINE_MESSAGE,
  DATA_USER_ID
} from './constants.js'
import { reactInstanceReader } from './react-instance-reader.js'
import { storage } from './storage.js'

const reactInstance = reactInstanceReader()

document.addEventListener('contextmenu', (event) => {
  const el = event.target as HTMLElement

  if (event.ctrlKey && el.classList.contains(CHAT_DISPLAY_NAME)) {
    event.preventDefault()

    const userId =
      reactInstance.getUserId(el) ||
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
})

observeElement(document.body, (mutation) => {
  observeChat(mutation)
})

function observeChat(mutation: MutationRecord) {
  for (const node of mutation.addedNodes) {
    if (node.nodeName === '#text') continue

    const element = node as HTMLElement
    if (!element.classList.contains(CHAT_LINE_MESSAGE)) continue

    const displayName = element.querySelector(`.${CHAT_DISPLAY_NAME}`)
    if (!displayName) continue

    const customName = getUserFromChat(element, displayName)
    if (!customName) continue
    displayName.innerHTML = `${displayName.textContent} (${customName})`
  }
}

function getUserFromChat(
  chatElement: Element,
  displayNameElement: Element
): string | null {
  const userIdFromFFZAttribute = chatElement.getAttribute(DATA_USER_ID)
  if (userIdFromFFZAttribute) {
    return storage.getCustomNameById(userIdFromFFZAttribute)
  } else {
    const userIdFromReactInstance = reactInstance.getUserId(displayNameElement)
    if (!userIdFromReactInstance) return null
    return storage.getCustomNameById(userIdFromReactInstance)
  }
}
