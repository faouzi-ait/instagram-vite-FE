import styles from './AppHeader.module.css'

type AppHeaderProps = {
  title: string
}

const AppHeader = ({ title }: AppHeaderProps) => {
  return <header className={styles.header}>{title}</header>
}

export default AppHeader
