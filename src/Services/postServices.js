import API from '../api/axios'


export const getPosts = async (page = 1, categoryId = '') => {

  const response = await API.get(
     `/getPosts?page=${page}&limit=50${categoryId ? `&categoryId=${categoryId}` : ''}`
  )

  return response.data
}

export const getSinglePost = async (id) => {
  const response = await API.get(`/getPosts/${id}`)
  return response.data
}

export const searchPosts = async (searchTerm, page = 1) => {
  const response = await API.get(
    `/getPosts/searchPosts?q=${searchTerm}&page=${page}&limit=50`
  )
  return response.data
}