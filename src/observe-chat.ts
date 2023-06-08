import {
  CHAT_DISPLAY_NAME,
  CHAT_LINE_MESSAGE,
  CHAT_NOTICE_MESSAGE
} from './constants.js'
import { getUserFromChat } from './helpers.js'

export function observeChat(mutation: MutationRecord): void {
  for (const node of mutation.addedNodes) {
    if (node.nodeName === '#text') continue

    const element = node as HTMLElement
    const isMessage =
      element.classList.contains(CHAT_LINE_MESSAGE) ||
      element.classList.contains(CHAT_NOTICE_MESSAGE)
    if (!isMessage) continue

    const displayName = element.querySelector(`.${CHAT_DISPLAY_NAME}`)
    if (!displayName) continue

    const customName = getUserFromChat(element, displayName)
    if (!customName) continue
    displayName.innerHTML = `${displayName.textContent} (${customName})`
  }
}
