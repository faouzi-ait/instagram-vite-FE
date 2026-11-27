import { use } from 'react'
import { ModalContext } from '../context/ModalProvider'

export const useModal = () => {
  const context = use(ModalContext)

  if (context === null) {
    throw new Error('useModal must be used within ModalProvider')
  }

  return context
}
