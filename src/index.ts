import { observeElement } from '@zero-dependency/dom'
import { reactInstanceReader } from './helpers.js'
import { storage } from './storage.js'

const reactInstance = reactInstanceReader()

document.addEventListener('contextmenu', (event) => {
  const el = event.target as HTMLElement

  if (event.ctrlKey && el.classList.contains('chat-author__display-name')) {
    event.preventDefault()

    const userId = reactInstance.getUserId(el)
    const user = storage.getCustomNameById(userId)
    const promptResult = prompt(
      `Set a custom name for ${el.textContent}:`,
      user ?? ''
    )
    if (promptResult === null) return

    storage.addCustomName([userId, promptResult])
  }
})

observeElement(document.body, (mutation, observer) => {
  observeChat(mutation)
})

function observeChat(mutation: MutationRecord) {
  for (const node of mutation.addedNodes) {
    if (node.nodeName === '#text') continue

    const el = node as HTMLElement
    const chatLineMessage = el.classList.contains('chat-line__message')
    if (!chatLineMessage) continue

    const displayName = el.querySelector('.chat-author__display-name')
    if (!displayName) continue

    const userId = reactInstance.getUserId(displayName)
    // console.log(displayName.textContent, userId)
    const customName = storage.getCustomNameById(userId)
    if (!customName) continue

    displayName.textContent = `${displayName.textContent} (${customName})`
  }
}
