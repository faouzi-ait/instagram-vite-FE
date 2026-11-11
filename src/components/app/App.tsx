import { useEffect, useState } from 'react'
import { apiGet } from '../../api/apiCalls'
import styles from './App.module.css'

const App = () => {
  const [health, setHealth] = useState<unknown>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchHealth = async () => {
      setError(null)

      try {
        const result = await apiGet<unknown>('/health', {
          signal: controller.signal,
        })
        setHealth(result)
      } catch (requestError) {
        if (controller.signal.aborted) {
          return
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : 'An unexpected error occurred while checking the API.',
        )
      }
    }

    fetchHealth()

    return () => controller.abort()
  }, [])

  if (error) {
    return (
      <div className={styles.requestError} role="alert">
        <strong>Could not reach the API</strong>
      </div>
    )
  }

  return (
    <main className={styles.healthPage}>
      <section className={styles.healthCard} aria-labelledby="page-title">
        <div className={styles.responsePanelHeading}>
          <span className={styles.statusDot} aria-hidden="true" />
          <h2>Response</h2>
        </div>
        <pre>
          {typeof health === 'string'
            ? health
            : JSON.stringify(health, null, 2)}
        </pre>
      </section>
    </main>
  )
}

export default App
