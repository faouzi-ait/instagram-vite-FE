import axios, { type AxiosRequestConfig } from 'axios'
import api from './api'

const getApiError = (error: unknown, method: string, url: string): Error => {
  let message = error instanceof Error ? error.message : 'Unexpected API error'

  if (axios.isAxiosError(error)) {
    const responseData: unknown = error.response?.data

    if (typeof responseData === 'string' && responseData) {
      message = responseData
    } else if (responseData && typeof responseData === 'object') {
      const data = responseData as { detail?: unknown; message?: unknown }
      if (typeof data.detail === 'string') message = data.detail
      else if (typeof data.message === 'string') message = data.message
    } else if (!error.response) {
      message = `Unable to reach the API: ${error.message}`
    }
  }

  return new Error(`${method} ${url} failed: ${message}`, { cause: error })
}

export const apiGet = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<TResponse> => {
  try {
    const response = await api.get<TResponse>(url, config)
    return response.data
  } catch (error) {
    throw getApiError(error, 'GET', url)
  }
}

export const apiPost = async <TResponse, TBody = unknown>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig<TBody>,
): Promise<TResponse> => {
  try {
    const response = await api.post<TResponse>(url, body, config)
    return response.data
  } catch (error) {
    throw getApiError(error, 'POST', url)
  }
}

export const apiPut = async <TResponse, TBody = unknown>(
  url: string,
  body: TBody,
  config?: AxiosRequestConfig<TBody>,
): Promise<TResponse> => {
  try {
    const response = await api.put<TResponse>(url, body, config)
    return response.data
  } catch (error) {
    throw getApiError(error, 'PUT', url)
  }
}

export const apiDelete = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<TResponse> => {
  try {
    const response = await api.delete<TResponse>(url, config)
    return response.data
  } catch (error) {
    throw getApiError(error, 'DELETE', url)
  }
}
