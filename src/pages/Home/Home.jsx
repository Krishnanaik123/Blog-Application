import { useEffect, useState } from 'react'
import { getPosts } from '../../Services/postServices'
import { getCategories } from '../../services/categoryService'
import PostCard from '../../components/PostCard/PostCard'
import Shimmer from '../../components/Shimmer/Shimmer'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Footer from '../../components/Footer/Footer'
import CategoryDropdown from '../../components/CategoryDropdown/CategoryDropdown'
import Pagination from '../../components/Pagination/Pagination'

import './Home.css'

function Home() {

  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  const fetchAllPosts = async () => {

    try {

      const data = await getPosts()

      console.log(data)

      if (data.success) {

        setPosts(data.data)
        setFilteredPosts(data.data)

      }

    } catch (error) {

      console.log('Error Fetching Posts:', error)

    } finally {

      setLoading(false)

    }
  }
  const fetchCategories = async () => {

    try {

      const data = await getCategories()
      console.log(data)
      if (data.success) {
        setCategories(data.data)
      }

    } catch (error) {

      console.log('Category Error:', error)

    }
  }

  useEffect(() => {
    if (selectedCategory === '') {
      setFilteredPosts(posts)

    } else {

      const filtered = posts.filter(
        (post) =>
          post.CategoryId === Number(selectedCategory)
      )
      setFilteredPosts(filtered)
    }

    setCurrentPage(1)

  }, [selectedCategory, posts])

  // Initial Load
  useEffect(() => {

    fetchAllPosts()
    fetchCategories()

  }, [])

  // Pagination Logic
  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage

  const currentPosts = filteredPosts.slice(
    firstPostIndex,
    lastPostIndex
  )

  const totalPages = Math.ceil(
    filteredPosts.length / postsPerPage
  )

  return (

    <>
      <Navbar />
      <Hero />
      <div className="home-container">

        <h1 className="main-title">
          All Blog Posts
        </h1>
        <CategoryDropdown
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {
          loading ? (

            <div className="posts-grid">

              {
                [...Array(6)].map((_, index) => (

                  <Shimmer key={index} />

                ))
              }

            </div>

          ) : (

            <>

              <div className="posts-grid">

                {
                  currentPosts.map((post) => (

                    <PostCard
                      key={post.PostId}
                      post={post}
                    />

                  ))
                }

              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />

            </>

          )
        }

      </div>
      <Footer />

    </>
  )
}

export default Home