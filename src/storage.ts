import { Cookie } from '@zero-dependency/cookie'
import { STORAGE_KEY } from './constants.js'

export type User = [userId: string, customName: string]

class Storage extends Cookie<{ customNames: User[] }> {
  private storageValue: User[]

  constructor() {
    super({
      initialValue: {
        [STORAGE_KEY]: []
      },
      attributes: {
        domain: 'twitch.tv',
        'max-age': 60 * 60 * 24 * 365
      },
      encode(value) {
        return JSON.stringify(value)
      },
      decode(value) {
        try {
          return JSON.parse(value)
        } catch {
          return null
        }
      }
    })

    this.storageValue = this.get(STORAGE_KEY)!
  }

  addCustomName(user: User): void {
    const customNames = this.get(STORAGE_KEY)!
    this.storageValue = customNames.filter((value) => value[0] !== user[0])
    this.storageValue.push(user)
    this.set(STORAGE_KEY, this.storageValue)
  }

  getCustomNameById(userId: string): string | null {
    const user = this.storageValue.find((user) => user[0] === userId)
    if (user) return user[1]
    return null
  }
}

export const storage = new Storage()
