// App logic for "What Should I Do":
// - Displays a cozy suggestion card for small, kind actions
// - Button generates a new suggestion randomly from a predefined list
// - Minimal, calming UI with no metrics or tracking


import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { getSettings, applyDarkMode } from './lib/settings'
import App from './App'
import './index.css'

applyDarkMode(getSettings().darkMode)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
