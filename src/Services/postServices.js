import API from '../api/axios'

export const getPosts = async () => {
  const response = await API.get('/getPosts?page=1&limit=10')
    return response.data
}
export const getSinglePost = async (id) => {
  const response = await API.get(`/getPosts/${id}`)
  return response.data
}