# twitch-custom-username

## Install

- Install [Tampermonkey](https://www.tampermonkey.net/) for your browser.
- Install Userscript [twitch-custom-username.user.js](https://gigachad-dev.github.io/twitch-custom-username/twitch-custom-username.user.js)

## Usage

![image](https://github.com/gigachad-dev/twitch-custom-username/assets/15673111/64a959aa-0f61-491f-bc74-2066e3e2ccf4)

### Shortcuts

- <kbd>Alt</kbd> + <kbd>Right-Click</kbd> — Add/Edit/Remove custom username (you have to click on the nickname in the chat).
- <kbd>Alt</kbd> + <kbd>Q</kbd> — Export config.
- <kbd>Alt</kbd> + <kbd>W</kbd> — Import config.

## Development

- Allow Tampermonkey's access to [local file URI's](https://tampermonkey.net/faq.php?ext=dhdg#Q204)
- Install dependencies with `pnpm i`
- `pnpm dev` to start your development
- Install proxy script from `dist/twitch-custom-username.proxy.user.js` or `http://localhost:3000`
