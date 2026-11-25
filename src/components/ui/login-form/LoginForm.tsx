/* eslint-disable no-console */
import { useId, useState, type SubmitEvent } from 'react'
import { useLogin } from '../../../hooks/useAuth'
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage'

type LoginFormProps = {
  onClose: () => void
}

export const LoginForm = ({ onClose }: LoginFormProps) => {
  const id = useId()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginMutation = useLogin()
  const errorId = `${id}-error`

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (loginMutation.isPending) return

    loginMutation.mutate(
      {
        email: email.trim(),
        password,
      },
      {
        onSuccess: (user) => {
          console.log('Logged-in user:', user)
          onClose()
        },
      },
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={loginMutation.isPending}
      aria-describedby={loginMutation.isError ? errorId : undefined}
    >
      <h2>Log in</h2>

      <fieldset disabled={loginMutation.isPending}>
        <legend>Account details</legend>

        <div>
          <label htmlFor={`${id}-email`}>Email</label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              loginMutation.reset()
            }}
          />
        </div>

        <div>
          <label htmlFor={`${id}-password`}>Password</label>
          <input
            id={`${id}-password`}
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              loginMutation.reset()
            }}
          />
        </div>
      </fieldset>

      {loginMutation.isError && (
        <p id={errorId} role="alert">
          {getApiErrorMessage(loginMutation.error)}
        </p>
      )}

      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Logging in…' : 'Log in'}
      </button>

      <button
        type="button"
        onClick={onClose}
        disabled={loginMutation.isPending}
      >
        Cancel
      </button>
    </form>
  )
}
