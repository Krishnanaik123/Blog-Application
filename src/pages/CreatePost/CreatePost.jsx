import { useEffect, useState,  } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getTokenFromCookie } from '../../utils/auth'

import './CreatePost.css'

function CreatePost() {

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: '',
    AuthorId: '',
    image: null
  })

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [categoriesError, setCategoriesError] = useState(null)

  // Page Load
  useEffect(() => {
    // Load Categories
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true)
        setCategoriesError(null)

        const response = await fetch(
          'http://localhost:5000/api/getCategories'
        )

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        console.log(data)

        if (data.success) {
          setCategories(data.data)
        } else {
          setCategoriesError(data.message || 'Failed to load categories')
        }

      } catch (error) {
        console.log(error)
        setCategoriesError(error.message || 'Error loading categories')
      } finally {
        setCategoriesLoading(false)
      }
    }

    loadCategories()

  }, [])

  // Handle Inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setFormData({
        ...formData,
        image: files[0]
      })

    } else {

      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      setLoading(true)

      // FormData
      const form = new FormData()

      form.append('title', formData.title)
      form.append('content', formData.content)
      form.append('category_id', formData.category_id)
      form.append('AuthorId', formData.AuthorId)

      // Image
      if (formData.image) {

        form.append(
          'image',
          formData.image
        )
      }

      // Token
      const token = getTokenFromCookie()
      console.log("TOKEN =>", token)

      // API Call
      const response = await fetch(
        'http://localhost:5000/api/blogPosts',
        {
          method: 'POST',

          headers: {
            Authorization: `Bearer ${token}`
          },

          credentials: 'include',

          body: form
        }
      )

      const data = await response.json()
      console.log(data)
      if (data.success) {
        alert('Post Created Successfully')
        window.location.href = '/'
      } else {
        alert(data.message)
      }

    } catch (error) {
      console.log(error)
      alert('Failed To Create Post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>
              Create New Post
            </h2>

            <p>
              Share your story with the world
            </p>

          </div>

          <form onSubmit={handleSubmit}>
            {categoriesError && (
              <div className="error-message">
                Error loading categories: {categoriesError}
              </div>
            )}

            {categoriesLoading && (
              <div className="loading-message">
                Loading categories...
              </div>
            )}

            <div className="form-group">

              <label>
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title..."
                required
              />

            </div>

            <div className="form-group">

              <label>
                Content
              </label>

              <textarea
                rows="8"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your story here..."
                required
              />

            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Category
                </label>

                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Category
                  </option>

                  {
                    categories.map((category) => (

                      <option
                        key={category.CategoryId}
                        value={category.CategoryId}
                      >
                        {category.CategoryName}
                      </option>

                    ))
                  }

                </select>
              </div>
            
    <div className="form-group">
                <label>
                  Author ID
                </label>

                <input
                  type="number"
                  name="AuthorId"
                  value={formData.AuthorId}
                  onChange={handleChange}
                  placeholder="Enter Author ID"
                  required
                />

              </div>
            </div>

            <div className="form-group">
              <label>
                Upload Image
              </label>

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >

              {
                loading
                  ? 'Publishing...'
                  : 'Publish Post'
              }

            </button>
          </form>
        </div>
      </main>
      <Footer />

    </>
  )
}

export default CreatePost