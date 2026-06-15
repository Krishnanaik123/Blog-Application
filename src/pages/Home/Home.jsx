import { useEffect, useState } from 'react'
import { getPosts, searchPosts } from '../../Services/postServices'
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
  const [searchText, setSearchText] = useState('');

  // Categories — once fetch cheyyali
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories()
        if (categoriesData.success) {
          setCategories(categoriesData.data)
        }
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
      && !loading
      && currentPage < totalPages
    ) {
      setCurrentPage(prev => prev + 1)
    }
  }

  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [loading, currentPage, totalPages])


useEffect(() => {
  const updateHeroMargin = () => {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    if (navbar && hero) {
      const navHeight = navbar.offsetHeight;
      hero.style.marginTop = navHeight + 'px';
    }
  }

  updateHeroMargin(); // pehle ek baar run karo
  window.addEventListener('resize', updateHeroMargin); // resize pe bhi run karo
  return () => window.removeEventListener('resize', updateHeroMargin);
}, [])

  //  Search useEffect — searchText change aite only
  useEffect(() => {
    if (!searchText.trim()) return;

    const timer = setTimeout(async () => {
      try {
        setLoading(true)
        const searchData = await searchPosts(searchText, 1)
        if (searchData.success) {
          setPosts(searchData.data)
          setTotalPages(searchData.pagination?.totalPages || 1)
          setCurrentPage(1)
        }
      } catch (error) {
        console.error('Error searching:', error)
      } finally {
        setLoading(false)
      }
    }, 500) 

    return () => clearTimeout(timer)

  }, [searchText]) 
  useEffect(() => {
    if (searchText.trim()) return; 

    const fetchData = async () => {
      try {
        setLoading(true)
        const postsData = await getPosts(currentPage, selectedCategory)
        if (postsData.success) {
          setPosts(prev => currentPage === 1 ? postsData.data : [...prev, ...postsData.data])
          setTotalPages(postsData.pagination.totalPages)
        }
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

  }, [currentPage, selectedCategory]) 
  return (
    <div className="home-page-root">
      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchText={searchText}
        setSearchText={setSearchText}
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
              {posts.map((post) => (
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