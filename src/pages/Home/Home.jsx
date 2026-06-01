import { useEffect, useState } from 'react'
import { getPosts } from '../../Services/postServices'
import { getCategories } from '../../Services/categoryService'
import PostCard from '../../components/PostCard/PostCard'
import Shimmer from '../../components/Shimmer/Shimmer'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Footer from '../../components/Footer/Footer'
import Pagination from '../../components/Pagination/Pagination'
import { useTranslation } from "react-i18next";
import './Home.css'

function Home() {
  const { i18n } = useTranslation();
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const filteredPosts =
    selectedCategory === ''
      ? posts
      : posts.filter((post) => post.CategoryId === Number(selectedCategory))

  // Initial Load Fetch all posts and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getPosts(currentPage)
        if (postsData.success) {
          setPosts(postsData.data)
          setTotalPages(postsData.pagination.totalPages)
        }

        const categoriesData = await getCategories()
        if (categoriesData.success) {
          setCategories(categoriesData.data)
        }
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [currentPage])

  return (
    <div className="home-page-root">
      {/* Navbar receives state controls to render the category dropdown inside it */}
      <Navbar 
        categories={categories} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      <Hero />

      <div className="home-container">
        <h1 className="main-title">All Blog Posts</h1>

        {loading ? (
          <div className="posts-grid">
            {[...Array(6)].map((_, index) => (
              <Shimmer key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="posts-grid">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.PostId}
                  post={post}
                  language={i18n.language}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Home