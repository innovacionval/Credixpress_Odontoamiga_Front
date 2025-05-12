import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter basename={import.meta.env.DEV ? '/' : '/Credixpress_Odontoamiga_Front/'}>
      <App />
    </HashRouter>
  </StrictMode>,
)
