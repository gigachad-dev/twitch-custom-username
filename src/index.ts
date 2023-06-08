import { observeElement } from '@zero-dependency/dom'
import { observeChat } from './observe-chat.js'
import { shortcuts } from './shortcuts.js'

document.addEventListener('keydown', (event) => {
  // export Alt + Q
  shortcuts.importConfig(event)

  // import Alt + W
  shortcuts.exportConfig(event)
})

document.addEventListener('contextmenu', (event) => {
  // add custom username Alt + RMB
  shortcuts.addCustomUsername(event)
})

observeElement(document.body, (mutation) => observeChat(mutation))
