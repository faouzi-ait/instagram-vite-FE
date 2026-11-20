import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './components/app/App.tsx'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  </QueryClientProvider>,
)
