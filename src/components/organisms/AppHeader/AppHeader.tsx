import { useNavigate } from 'react-router-dom'
import LoginLink from '../../atoms/buttons/LoginLink'
import styles from './AppHeader.module.css'

type AppHeaderProps = {
  title: string
}

const AppHeader = ({ title }: AppHeaderProps) => {
  const navigate = useNavigate()
  return (
    <header className={styles.header}>
      <div onClick={() => navigate('/')}>{title}</div>
      <LoginLink />
    </header>
  )
}

export default AppHeader
