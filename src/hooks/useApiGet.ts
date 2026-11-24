import type { AxiosRequestConfig } from 'axios'
import { useQuery, type QueryKey } from '@tanstack/react-query'

import { apiGet } from '../api/apiCalls'

type UseApiGetOptions = {
  queryKey: QueryKey
  url: string
  config?: AxiosRequestConfig
  enabled?: boolean
  staleTime?: number
  refetchOnMount?: boolean | 'always'
  refetchInterval?: number | false
}

export function useApiGet<TResponse>({
  queryKey,
  url,
  config,
  enabled = true,
  staleTime = 0,
  refetchOnMount = 'always',
  refetchInterval = 30_000,
}: UseApiGetOptions) {
  return useQuery<TResponse, Error>({
    queryKey,
    queryFn: ({ signal }) => apiGet<TResponse>(url, { ...config, signal }),
    enabled,
    retry: false,
    staleTime,
    refetchOnMount,
    refetchOnWindowFocus: true,
    refetchInterval,
  })
}
