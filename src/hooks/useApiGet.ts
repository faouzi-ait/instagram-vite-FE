import type { AxiosRequestConfig } from 'axios'
import { useQuery, type QueryKey } from '@tanstack/react-query'

import { apiGet } from '../api/apiCalls'

type UseApiGetOptions = {
  queryKey: QueryKey
  url: string
  config?: AxiosRequestConfig
  enabled?: boolean
  staleTime?: number
}

export function useApiGet<TResponse>({
  queryKey,
  url,
  config,
  enabled = true,
  staleTime = 60_000,
}: UseApiGetOptions) {
  return useQuery<TResponse, Error>({
    queryKey,
    queryFn: ({ signal }) => apiGet<TResponse>(url, { ...config, signal }),
    enabled,
    retry: false,
    staleTime,
  })
}
