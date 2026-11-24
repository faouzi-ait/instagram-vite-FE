import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCurrentUser, login, logout } from '../api/auth'
import type { UserResponse } from '../types/api'

const currentUserKey = ['auth', 'me'] as const

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    retry: false,

    onSuccess: async (user) => {
      await queryClient.cancelQueries()

      queryClient.setQueryData<UserResponse | null>(['auth', 'me'], user)

      // Reload application data using the authenticated session.
      await queryClient.resetQueries({
        predicate: (query) => query.queryKey[0] !== 'auth',
      })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    retry: false,

    onSuccess: async () => {
      await queryClient.cancelQueries()

      queryClient.setQueryData<UserResponse | null>(currentUserKey, null)

      // Remove private results and reload active queries as a guest.
      await queryClient.resetQueries({
        predicate: (query) => query.queryKey[0] !== 'auth',
      })
    },
  })
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: currentUserKey,
    queryFn: ({ signal }) => getCurrentUser(signal),
    retry: false,
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  })
}
