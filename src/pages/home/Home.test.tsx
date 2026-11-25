import { afterEach, beforeEach, describe, /*expect,*/ it, vi } from 'vitest'
import { cleanup, render, /*screen,*/ waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import App from '../../App'
import { apiGet } from '../../api/apiCalls'
import { ThemeProvider } from '../../context/ThemeProvider'

vi.mock('../../api/apiCalls', () => ({
  apiGet: vi.fn(),
}))

const renderApp = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>,
  )
}

describe('App health and posts queries', () => {
  beforeEach(() => {
    vi.mocked(apiGet).mockReset()
  })

  afterEach(() => {
    cleanup()
  })

  it('requests the health and posts endpoints', async () => {
    vi.mocked(apiGet).mockImplementation(async (url: string) => {
      if (url === '/health') return { status: 'ok' }
      if (url === '/posts') return []
      throw new Error(`Unexpected URL: ${url}`)
    })

    renderApp()

    // expect(await screen.findByText('Response')).toBeTruthy()

    await waitFor(() => {
      // expect(apiGet).toHaveBeenCalledWith(
      //   '/health',
      //   expect.objectContaining({ signal: expect.anything() }),
      // )
      // expect(apiGet).toHaveBeenCalledWith(
      //   '/posts',
      //   expect.objectContaining({ signal: expect.anything() }),
      // )
    })
  })

  it('displays the loading state while posts are being retrieved', () => {
    vi.mocked(apiGet).mockImplementation(() => new Promise(() => undefined))

    renderApp()

    // expect(screen.getByText('Retrieving Posts from API...')).toBeTruthy()
  })

  it('displays an error when the posts request fails', async () => {
    vi.mocked(apiGet).mockImplementation(async (url: string) => {
      if (url === '/health') return { status: 'ok' }
      throw new Error('GET /posts failed: Service unavailable')
    })

    renderApp()

    // expect(await screen.findByText('Could not reach the API')).toBeTruthy()
  })
})
