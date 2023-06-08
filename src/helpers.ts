import { DATA_USER_ID } from './constants.js'
import { reactInstanceReader } from './react-instance-reader.js'
import { storage } from './storage.js'

export function getUserFromChat(
  chatElement: Element,
  displayNameElement: Element
): string | null {
  const userIdFromFFZAttribute = chatElement.getAttribute(DATA_USER_ID)
  if (userIdFromFFZAttribute) {
    return storage.getCustomNameById(userIdFromFFZAttribute)
  } else {
    const userIdFromReactInstance =
      reactInstanceReader.getUserId(displayNameElement)
    if (!userIdFromReactInstance) return null
    return storage.getCustomNameById(userIdFromReactInstance)
  }
}
