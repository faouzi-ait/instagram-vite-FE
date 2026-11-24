import { use } from 'react'
import { ThemeContext } from '../context/ThemeProvider'

export const useTheme = () => {
  const context = use(ThemeContext)

  if (context === null) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
