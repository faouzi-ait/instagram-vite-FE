import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { apiGet } from '../../api/apiCalls'
import App from './App'

vi.mock('../../api/apiCalls', () => ({
  apiGet: vi.fn(),
}))

describe('App health check', () => {
  beforeEach(() => {
    vi.mocked(apiGet).mockReset()
  })

  afterEach(() => {
    cleanup()
  })

  it('requests the health endpoint and displays a JSON response', async () => {
    vi.mocked(apiGet).mockResolvedValue({ status: 'ok' })

    render(<App />)

    await waitFor(() => {
      expect(document.querySelector('pre')?.textContent).toContain(
        '"status": "ok"',
      )
    })

    expect(apiGet).toHaveBeenCalledOnce()
    expect(apiGet).toHaveBeenCalledWith(
      '/health',
      expect.objectContaining({ signal: expect.anything() }),
    )
  })

  it('displays a plain-text response when the API does not return JSON', async () => {
    vi.mocked(apiGet).mockResolvedValue('healthy')

    render(<App />)

    expect(await screen.findByText('healthy')).toBeTruthy()
  })

  it('displays an error when the API responds unsuccessfully', async () => {
    vi.mocked(apiGet).mockRejectedValue(
      new Error('GET /health failed: Service unavailable'),
    )

    render(<App />)

    const alert = await screen.findByRole('alert')
    expect(alert.textContent).toContain(
      'GET /health failed: Service unavailable',
    )
  })
})
