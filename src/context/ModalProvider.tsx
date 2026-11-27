/* eslint-disable react-refresh/only-export-components */
import {
  useState,
  createContext,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'

type ModalContextValue = {
  title: ReactNode
  content: ReactNode
  closeModal: () => void
  openModal: (title: ReactNode, content: ReactNode) => void
}

export const ModalContext = createContext<ModalContextValue | null>(null)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState<ReactNode>(null)
  const [content, setContent] = useState<ReactNode>(null)

  const openModal = useCallback((title: ReactNode, content: ReactNode) => {
    setTitle(title)
    setContent(content)
  }, [])

  const closeModal = useCallback(() => {
    setTitle(null)
    setContent(null)
  }, [])

  const value = useMemo(
    () => ({ title, content, openModal, closeModal }),
    [title, content, openModal, closeModal],
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
