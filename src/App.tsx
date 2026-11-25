import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import AppHeader from './components/layout/AppHeader/AppHeader'
import Profile from './pages/user-profile'
import { ProtectedRoute } from './components/routing/ProtectedRoute'

const App = () => {
  return (
    <>
      <AppHeader title="Instagram" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
