import { Cookie } from '@zero-dependency/cookie'
import { STORAGE_KEY } from './constants.js'

export type User = [userId: string, customName: string]

class Storage extends Cookie<{ customNames: User[] }> {
  values: User[]

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

    this.values = this.get(STORAGE_KEY)!
  }

  write(data: string) {
    this.values = JSON.parse(data)
    this.set(STORAGE_KEY, this.values)
  }

  addCustomName(user: User): void {
    const [userId, customName] = user
    const customNames = this.get(STORAGE_KEY)!
    this.values = customNames.filter((value) => value[0] !== userId)
    if (customName) this.values.push(user)
    this.set(STORAGE_KEY, this.values)
  }

  getCustomNameById(userId: string): string | null {
    const user = this.values.find((user) => user[0] === userId)
    if (user) return user[1]
    return null
  }
}

export const storage = new Storage()
