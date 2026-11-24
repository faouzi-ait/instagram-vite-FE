/* eslint-disable no-console */
import { LoginForm } from '../../components/login-form/LoginForm'
import { useApiGet } from '../../hooks/useApiGet'
import { useCurrentUser, useLogout } from '../../hooks/useAuth'
import { healthReqObject, postsReqObject } from '../../api/reqObj'
import type { PostResponse } from '../../types/api'
import { useTheme } from '../../hooks/useTheme'
import styles from './home.module.css'

const Home = () => {
  const { theme, toggleTheme } = useTheme()
  const logoutMutation = useLogout()
  const healthStatus = useApiGet<{ status: string }>(healthReqObject)
  const { data: user } = useCurrentUser()
  const {
    data: posts,
    isPending,
    error,
    refetch,
  } = useApiGet<PostResponse[]>(postsReqObject)

  if (isPending) return <p>Retrieving Posts from API...</p>
  if (error) return <strong>Could not reach the API</strong>

  console.log(posts, user)

  return (
    <main className={styles.healthPage}>
      <section className={styles.healthCard} aria-labelledby="page-title">
        <div className={styles.responsePanelHeading}>
          <span className={styles.statusDot} aria-hidden="true" />

          <h2 id="page-title">Response</h2>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme ? 'dark' : 'light'} mode`}
          >
            {theme ? 'Light mode' : 'Dark mode'}
          </button>
          <button
            type="button"
            onClick={() => refetch()}
            aria-label="Refresh posts"
          >
            Refresh posts
          </button>
        </div>
        {user && (
          <button
            type="button"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? 'Logging out…' : 'Log out'}
          </button>
        )}
        <pre className={styles.responsePre}>
          {JSON.stringify(healthStatus.data, null, 2)}
        </pre>
      </section>
      <LoginForm onClose={() => console.log('Login form closed')} />
    </main>
  )
}

export default Home
