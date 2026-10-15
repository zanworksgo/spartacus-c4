import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { ToastProvider } from './components/ToastProvider'
import { ContentProvider } from './lib/content'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
