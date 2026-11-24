import axios from 'axios'
import api from './api'
import type { UserResponse } from '../types/api'

export type LoginData = {
  email: string
  password: string
}

export const login = async (data: LoginData): Promise<UserResponse> => {
  await api.post('/auth/login', data)
  const user = await getCurrentUser() // Retrieve the user using the session cookie set by login.

  if (!user)
    throw new Error('Login succeeded, but the session could not be verified.')

  return user
}

export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout')
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) return // An expired session already means the user is logged out.

    throw error
  }
}

export const getCurrentUser = async (
  signal?: AbortSignal,
): Promise<UserResponse | null> => {
  try {
    const response = await api.get<UserResponse>('/auth/me', { signal })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) return null // An anonymous visitor is an expected state.
    throw error // Network and server failures remain errors.
  }
}
