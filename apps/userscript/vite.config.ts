import { defineConfig } from 'vite'
import Userscript from 'vite-userscript-plugin'
import { author, homepage, license, version } from './package.json'

export default defineConfig((config) => {
  return {
    plugins: [
      Userscript({
        entry: 'src/index.ts',
        header: {
          name: 'twitch-extended-chat',
          version,
          author,
          license,
          homepage,
          noframes: true,
          match: 'https://*.twitch.tv/*'
        },
        server: {
          port: 3000
        }
      })
    ]
  }
})
