import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { DocViewerProvider } from './components/DocViewer'
import { ToastProvider } from './components/ToastProvider'
import './index.css'
import { ContentProvider } from './lib/content'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastProvider>
        <ContentProvider>
          <DocViewerProvider>
            <App />
          </DocViewerProvider>
        </ContentProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
