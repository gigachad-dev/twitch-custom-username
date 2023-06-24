import { observeElement } from '@zero-dependency/dom'
import { __DEV__ } from './constants.js'
import { observeChat } from './observe-chat.js'
import { shortcuts } from './shortcuts.js'

if (__DEV__) {
  console.log(GM_info)
}

document.addEventListener('keydown', (event) => {
  // add custom username Alt + 1
  shortcuts.addCustomUsername(event)

  // add/edit password Alt + 2
  shortcuts.editPassword(event)
})

document.addEventListener('contextmenu', (event) => {
  // add custom username Alt + RMB
  shortcuts.addCustomUsernameFromChat(event)
})

observeElement(document.body, (mutation) => observeChat(mutation))
