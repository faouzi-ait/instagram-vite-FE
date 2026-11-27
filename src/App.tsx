import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import AppHeader from './components/organisms/AppHeader/AppHeader'
import Profile from './pages/user-profile'
import { ProtectedRoute } from './components/infrastructure/routing/ProtectedRoute'
import { ModalHost } from './components/infrastructure/modal/ModalHost'

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
      <ModalHost />
    </>
  )
}

export default App
