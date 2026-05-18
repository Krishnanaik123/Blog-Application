import API from '../api/axios'

// Signup
export const signupUser = async (userData) => {
  const response = await API.post(
    '/auth',
    userData
  )

  return response.data
}

// Login
export const loginUser = async (userData) => {
 const response = await API.post(
    '/auth',
    userData
  )
  return response.data
}