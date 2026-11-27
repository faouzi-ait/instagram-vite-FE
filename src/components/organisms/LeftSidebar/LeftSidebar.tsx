import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../../../hooks/useAuth'
import { useModal } from '../../../hooks/useModal'
import LoginLink from '../../atoms/buttons/LoginLink'
import Icon from '../../atoms/Icon'
import styles from './LeftSidebar.module.css'

const LeftSidebar = () => {
  const navigate = useNavigate()
  const { openModal } = useModal()
  const { data: user } = useCurrentUser()

  const menuItems = [
    { name: 'home', action: () => navigate('/') },
    {
      name: 'create',
      action: () =>
        user
          ? openModal(<h2>Create Modal</h2>, <div>Create post</div>)
          : alert('Login to create a post'),
    },
    {
      name: 'heartEmpty',
      action: () =>
        user ? navigate('/follower') : alert('You must login first'),
    },
    {
      name: 'profile',
      action: () =>
        user ? navigate('/profile') : alert('You must login first'),
    },
  ] as const

  // console.log(
  //   `User ${user ? `${user?.username} is logged in` : 'is not logged in'}`,
  // )

  return (
    <aside className={styles.sidebar}>
      <nav>
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={styles.menuItem}
            onClick={() => item.action()}
          >
            <Icon name={item.name} size={28} />
            <span>
              {item.name === 'heartEmpty' ? 'Follow request' : item.name}
            </span>
          </li>
        ))}
      </nav>
      <LoginLink />
    </aside>
  )
}

export default LeftSidebar
