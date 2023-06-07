import { observeElement } from '@zero-dependency/dom'
import { reactInstanceReader } from './react-instance-reader.js'
import { storage } from './storage.js'

const reactInstance = reactInstanceReader()

document.addEventListener('contextmenu', (event) => {
  const el = event.target as HTMLElement

  if (event.ctrlKey && el.classList.contains('chat-author__display-name')) {
    event.preventDefault()

    const userId =
      reactInstance.getUserId(el) ||
      el.parentElement!.parentElement!.parentElement!.getAttribute(
        'data-user-id'
      )!

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

    const element = node as HTMLElement
    if (!element.classList.contains('chat-line__message')) continue

    const displayName = element.querySelector('.chat-author__display-name')
    if (!displayName) continue

    const customName = getUserFromChat(element, displayName)
    if (!customName) continue
    displayName.textContent = `${displayName.textContent} (${customName})`
  }
}

function getUserFromChat(
  chatElement: Element,
  displayNameElement: Element
): string | null {
  const userIdFromFFZAttribute = chatElement.getAttribute('data-user-id')
  if (userIdFromFFZAttribute) {
    return storage.getCustomNameById(userIdFromFFZAttribute)
  } else {
    const userIdFromReactInstance = reactInstance.getUserId(displayNameElement)
    if (!userIdFromReactInstance) return null
    return storage.getCustomNameById(userIdFromReactInstance)
  }
}
