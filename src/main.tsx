import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'

import { ErrorBoundary } from './components/infrastructure/error-boundary/ErrorBoundary'
import { ThemeProvider } from './context/ThemeProvider.tsx'
import { ModalProvider } from './context/ModalProvider.tsx'

import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <ThemeProvider>
        <ModalProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </BrowserRouter>
        </ModalProvider>
      </ThemeProvider>
    </StrictMode>
  </QueryClientProvider>,
)
