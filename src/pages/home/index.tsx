// import Theme from '../../components/ui/theme/Theme'
// import { LoginForm } from '../../components/ui/login-form/LoginForm'
import MainFeed from '../../components/organisms/MainFeed/MainFeed'
import LeftSidebar from '../../components/organisms/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/organisms/RightSidebar/RightSidebar'
import styles from './home.module.css'

const Home = () => {
  return (
    <main className={styles.homePage}>
      <LeftSidebar />
      <MainFeed />
      <RightSidebar />
      {/* <Theme /> */}
      {/* <LoginForm onClose={() => console.log('Login form closed')} /> */}
    </main>
  )
}

export default Home
