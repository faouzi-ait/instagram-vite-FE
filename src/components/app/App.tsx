/* eslint-disable no-console */
import { useApiGet } from '../../hooks/useApiGet'
import { healthReqObject, postsReqObject } from '../../api/reqObj'
import type { PostResponse } from '../../types/api'
import styles from './App.module.css'

const App = () => {
  const healthStatus = useApiGet<{ status: string }>(healthReqObject)
  const { data, isPending, error } = useApiGet<PostResponse[]>(postsReqObject)

  console.log(data)
  console.log(JSON.stringify(healthStatus.data, null, 2))

  if (isPending) return <p>Retrieving Posts from API...</p>
  if (error) return <strong>Could not reach the API</strong>

  return (
    <main className={styles.healthPage}>
      <section className={styles.healthCard} aria-labelledby="page-title">
        <div className={styles.responsePanelHeading}>
          <span className={styles.statusDot} aria-hidden="true" />
          <h2>Response</h2>
        </div>
      </section>
    </main>
  )
}

export default App
