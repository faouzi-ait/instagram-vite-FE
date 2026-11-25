import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Header from './components/layout/header/Header'
import Profile from './pages/user-profile'
import { ProtectedRoute } from './pages/protected-route/ProtectedRoute'

const App = () => {
  return (
    <>
      <Header title="Instagram" />
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
