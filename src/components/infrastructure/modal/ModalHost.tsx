import { Modal } from '../../molecules/Modal/Modal'
import { useModal } from '../../../hooks/useModal'

export const ModalHost = () => {
  const { title, content, closeModal } = useModal()

  if (content === null) return null

  return (
    <Modal title={title} onClose={closeModal}>
      {content}
    </Modal>
  )
}
