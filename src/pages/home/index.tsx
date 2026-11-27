// import { LoginForm } from '../../components/molecules/LoginForm/LoginForm'
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
      {/* <LoginForm onClose={() => console.log('Login form closed')} /> */}
    </main>
  )
}

export default Home
