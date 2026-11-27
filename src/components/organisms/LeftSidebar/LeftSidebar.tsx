import { useModal } from '../../../hooks/useModal'
import styles from './LeftSidebar.module.css'

const LeftSidebar = () => {
  const { openModal } = useModal()
  return (
    <aside className={styles.sidebar}>
      Sidebar Left
      <button
        type="button"
        onClick={() =>
          openModal(<h2>Custom modal title</h2>, <div>Modal content</div>)
        }
      >
        Show modal using a portal
      </button>
    </aside>
  )
}

export default LeftSidebar
