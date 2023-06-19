import { observeElement } from '@zero-dependency/dom'
import { observeChat } from './observe-chat.js'
import { shortcuts } from './shortcuts.js'

document.addEventListener('keydown', (event) => {
  // export Alt + 1
  shortcuts.exportConfig(event)

  // import Alt + 2
  shortcuts.importConfig(event)

  // add custom username Alt + 3
  shortcuts.addCustomUsername(event)
})

document.addEventListener('contextmenu', (event) => {
  // add custom username Alt + RMB
  shortcuts.addCustomUsernameFromChat(event)
})

observeElement(document.body, (mutation) => observeChat(mutation))
