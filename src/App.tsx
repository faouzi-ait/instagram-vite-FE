import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Profile from './pages/user-profile'
import Follower from './pages/follower'
import AppHeader from './components/organisms/AppHeader/AppHeader'
import { ModalHost } from './components/infrastructure/modal/ModalHost'
import { ProtectedRoute } from './components/infrastructure/routing/ProtectedRoute'

const App = () => {
  return (
    <>
      <AppHeader title="Instagram" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/follower" element={<Follower />} />
        </Route>
      </Routes>
      <ModalHost />
    </>
  )
}

export default App
