import { Cookie } from '@zero-dependency/cookie'

class PasswordManager {
  private cookie: Cookie<{ password: string }>

  constructor() {
    this.cookie = new Cookie({
      attributes: {
        domain: 'twitch.tv',
        'max-age': 60 * 60 * 24 * 365
      }
    })
  }

  get(): string | null {
    return this.cookie.get('password')
  }

  write(password: string): void {
    this.cookie.set('password', password)
  }
}

export const passwordManager = new PasswordManager()
