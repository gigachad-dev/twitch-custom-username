import { STORAGE_KEY } from './constants.js'

export type User = [userId: string, customName: string]

class Storage {
  private STORAGE_VALUES: User[]

  constructor() {
    this.init()
  }

  get values(): User[] {
    return this.STORAGE_VALUES
  }

  private init(): void {
    this.read()

    GM_addValueChangeListener(
      STORAGE_KEY,
      (key, oldValue, newValue, remote) => {
        if (!remote) return
        this.STORAGE_VALUES = newValue
      }
    )
  }

  private read(): User[] {
    this.STORAGE_VALUES = GM_getValue<User[]>(STORAGE_KEY, [])
    return this.STORAGE_VALUES
  }

  write(values?: User[]): void {
    if (values) this.STORAGE_VALUES = values
    GM_setValue(STORAGE_KEY, this.STORAGE_VALUES)
  }

  addCustomName(user: User): void {
    const [userId, customName] = user
    const users = this.read()
    this.STORAGE_VALUES = users.filter((value) => value[0] !== userId)
    if (customName) this.STORAGE_VALUES.push(user)
    this.write()
  }

  getCustomNameById(userId: string): string | null {
    const user = this.STORAGE_VALUES.find((user) => user[0] === userId)
    if (user) return user[1]
    return null
  }
}

export const storage = new Storage()
