import { LocalStorage } from '@zero-dependency/storage'

export type User = [userId: string, customName: string]

class Storage extends LocalStorage<User[]> {
  private users: User[]

  constructor() {
    super('custom-usernames', [])
    this.read()
  }

  private read(): void {
    this.users = this.value
  }

  addCustomName(user: User): void {
    this.write((values) => {
      this.users = values.filter((value) => value[0] !== user[0])
      this.users.push(user)
      return this.users
    })
  }

  getCustomNameById(userId: string): string | null {
    const user = this.users.find((user) => user[0] === userId)
    if (user) return user[1]
    return null
  }
}

export const storage = new Storage()
