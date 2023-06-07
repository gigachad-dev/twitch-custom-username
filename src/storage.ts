import { Cookie } from '@zero-dependency/cookie'

export type User = [userId: string, customName: string]

class Storage extends Cookie<{ customNames: User[] }> {
  private storageValue: User[]

  constructor() {
    super({
      initialValue: {
        customNames: []
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

    this.storageValue = this.get('customNames')!
  }

  addCustomName(user: User): void {
    const customNames = this.get('customNames')!
    this.storageValue = customNames.filter((value) => value[0] !== user[0])
    this.storageValue.push(user)
    this.set('customNames', this.storageValue)
  }

  getCustomNameById(userId: string): string | null {
    const user = this.storageValue.find((user) => user[0] === userId)
    if (user) return user[1]
    return null
  }
}

export const storage = new Storage()
