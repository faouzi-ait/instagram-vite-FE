import { useCurrentUser, useLogout } from '../../../hooks/useAuth'
import { useModal } from '../../../hooks/useModal'
import { LoginForm } from '../../molecules/LoginForm/LoginForm'
import Theme from '../../molecules/Theme/Theme'
import styles from './loginLink.module.css'

const LoginLink = () => {
  const logout = useLogout()
  const { openModal } = useModal()
  const { data: user } = useCurrentUser()

  return (
    <div className={styles.login}>
      {!user ? (
        <button
          type="button"
          onClick={() =>
            openModal(<h2>Login</h2>, <LoginForm onClose={() => null} />)
          }
        >
          Login
        </button>
      ) : (
        <button type="button" onClick={() => logout.mutate()}>
          Logout
        </button>
      )}
      <Theme />
    </div>
  )
}

export default LoginLink
