import { type AxiosRequestConfig } from 'axios'
import api from './api'

export const apiGet = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<TResponse> => {
  const response = await api.get<TResponse>(url, config)
  return response.data
}

export const apiPost = async <TResponse, TBody = unknown>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig<TBody>,
): Promise<TResponse> => {
  const response = await api.post<TResponse>(url, body, config)
  return response.data
}

export const apiPut = async <TResponse, TBody = unknown>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig<TBody>,
): Promise<TResponse> => {
  const response = await api.put<TResponse>(url, body, config)
  return response.data
}

export const apiDelete = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<TResponse> => {
  const response = await api.delete<TResponse>(url, config)
  return response.data
}
