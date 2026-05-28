import axios from 'axios'
import { getTokenFromCookie } from '../utils/auth'

const API = axios.create({
  baseURL: 'https://blog-application-backend-eight.vercel.app/api',
  withCredentials: true
})
// Request Interceptor
API.interceptors.request.use((config) => {
  const token = getTokenFromCookie()
  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`
  }

  return config
})

// Response Interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {

    // Token Expired
    if (error.response?.status === 401) {
      alert('Session Expired. Please Login')

      // Redirect
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default API