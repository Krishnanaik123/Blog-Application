import axios from 'axios'
import { getTokenFromCookie } from '../utils/auth'

const API = axios.create({

  //baseURL: import.meta.env.DEV ? 'http://localhost:5000/api' : '/api',
  // baseURL: 'http://localhost:5000/api',
   // baseURL: 'https://blog-application-backend-eight.vercel.app/api',
  baseURL: '/api',
  withCredentials: true
})

API.interceptors.request.use((config) => {
  const token = getTokenFromCookie()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

API.interceptors.response.use(
  (response) => response,
  (error) => {

    console.log("ERROR RESPONSE:", error.response?.data)

    return Promise.reject(error)
  }
)

export default API