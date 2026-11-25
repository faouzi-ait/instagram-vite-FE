import styles from './header.module.css'

type HeaderProps = {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  return <header className={styles.header}>{title}</header>
}

export default Header
