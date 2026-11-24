import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
  timeout: 1000,
})

api.interceptors.request.use(
  (config) => {
    // Modify the request config here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The server responded with a status code outside the range of 2xx
    }
    return Promise.reject(error)
  },
)

export default api
