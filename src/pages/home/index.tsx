// import Theme from '../../components/ui/theme/Theme'
// import { LoginForm } from '../../components/ui/login-form/LoginForm'
import MainListing from '../../components/layout/main-listing/MainListing'
import Sidebar from '../../components/layout/sidebar/Sidebar'
import styles from './home.module.css'

const Home = () => {
  return (
    <main className={styles.homePage}>
      <Sidebar />
      <MainListing />
      <Sidebar />
      {/* <Theme /> */}
      {/* <LoginForm onClose={() => console.log('Login form closed')} /> */}
    </main>
  )
}

export default Home
