import { getUsers, writeUserCustomName } from './api.js'
import { passwordManager } from './password-manager.js'

export type User = { id: string; name: string }

class Storage {
  private STORAGE_VALUES: User[] = []

  get values(): User[] {
    return this.STORAGE_VALUES
  }

  constructor() {
    this.init()
  }

  private async init(): Promise<void> {
    setInterval(() => this.read(), 60 * 1000)
    this.read()
  }

  private async read(): Promise<User[]> {
    this.STORAGE_VALUES = await getUsers()
    return this.STORAGE_VALUES
  }

  async setCustomName(user: User): Promise<void> {
    try {
      const password = passwordManager.get()
      const users = await this.read()
      this.STORAGE_VALUES = users.filter((value) => value.id !== user.id)
      if (user.name) this.STORAGE_VALUES.push(user)
      await writeUserCustomName({ ...user, password })
    } catch (err) {
      alert((err as Error).message)
    }
  }

  getCustomName(userId: string): string | null {
    const user = this.STORAGE_VALUES.find((user) => user.id === userId)
    if (user) return user.name
    return null
  }
}

export const storage = new Storage()
