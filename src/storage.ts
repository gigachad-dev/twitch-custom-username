import { getUsers, writeUserCustomName } from './api.js'
import { passwordManager } from './password-manager.js'

export type User = { id: string; name: string }

class Storage {
  private STORAGE_VALUES: User[] = []

  get values(): User[] {
    return this.STORAGE_VALUES
  }

  constructor() {
    this.read()
  }

  private async read(): Promise<User[]> {
    this.STORAGE_VALUES = await getUsers()
    return this.STORAGE_VALUES
  }

  async addCustomName(user: User): Promise<void> {
    const password = passwordManager.get()
    if (!password) {
      throw new Error('Дальше вы не пройдете пока не получите бумаги')
    }

    const users = await this.read()
    this.STORAGE_VALUES = users.filter((value) => value.id !== user.id)
    if (user.name) this.STORAGE_VALUES.push(user)
    await writeUserCustomName({ ...user, password })
  }

  getCustomNameById(userId: string): string | null {
    const user = this.STORAGE_VALUES.find((user) => user.id === userId)
    if (user) return user.name
    return null
  }
}

export const storage = new Storage()
