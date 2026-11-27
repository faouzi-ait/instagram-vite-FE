import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Icon from '../../atoms/Icon'
import styles from './modal.module.css'

type ModalProps = {
  title: ReactNode
  onClose: () => void
  children: ReactNode
}

export const Modal = ({ title, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const previouslyFocused = document.activeElement

    if (!dialog.open) dialog.showModal()

    return () => {
      if (dialog.open) dialog.close()
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus()
      }
    }
  }, [])

  const handleOutsideClick = (event: MouseEvent<HTMLDialogElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom

    if (outside) onClose()
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-label={typeof title === 'string' ? title : undefined}
      onClick={handleOutsideClick}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <div className={styles.headerLayout}>
        {title}
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon name="remove" size={28} />
        </button>
      </div>

      {children}
    </dialog>,
    document.body,
  )
}
