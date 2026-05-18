import API from '../api/axios'

export const getCategories = async () => {
  const response = await API.get('/getCategories')
  return response.data
}