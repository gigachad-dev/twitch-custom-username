import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'

const root = document.querySelector<HTMLElement>('#root')!

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
