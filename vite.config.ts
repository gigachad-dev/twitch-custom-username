import { defineConfig } from 'vite'
import Userscript from 'vite-userscript-plugin'
import { name, version, homepage, license, author } from './package.json'

export default defineConfig((config) => {
  return {
    plugins: [
      Userscript({
        entry: 'src/index.ts',
        header: {
          name,
          version,
          author,
          license,
          homepage,
          match: 'https://www.twitch.tv/*'
        },
        server: {
          port: 3000
        }
      })
    ]
  }
})
