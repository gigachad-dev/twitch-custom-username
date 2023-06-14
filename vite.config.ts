import { defineConfig } from 'vite'
import Userscript from 'vite-userscript-plugin'
import { author, homepage, license, name, version } from './package.json'

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
          resource: [['iframe-storage-url', homepage + 'index.html']],
          match: 'https://*.twitch.tv/*'
        },
        server: {
          port: 3000
        }
      })
    ]
  }
})
