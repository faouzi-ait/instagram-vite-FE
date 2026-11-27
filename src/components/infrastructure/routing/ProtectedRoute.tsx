import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useCurrentUser } from '../../../hooks/useAuth'

export const ProtectedRoute = () => {
  const { data: user, isPending, isError, refetch } = useCurrentUser()
  const location = useLocation()
  const navigationState = { returnTo: location.pathname, openLogin: true }

  if (isPending) return <p>Checking your session…</p>

  if (isError) {
    return (
      <div role="alert">
        <p>Could not check your session.</p>
        <button onClick={() => refetch()}>Try again</button>
      </div>
    )
  }

  if (!user) return <Navigate to="/" replace state={navigationState} />

  return <Outlet />
}
