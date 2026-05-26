import { useEffect, useState } from 'react'
import {useParams,useSearchParams} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getSinglePost } from '../../Services/postServices'
import translationsData from '../../data/translations.json'
import './PostDetails.css'


function PostDetails() {

  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams();


  // Selected Language

  const language = searchParams.get('lang') ||

    localStorage.getItem(
      "selectedLanguage"
    ) ||

    "en";

  // Translation Match

  const translatedPost = translationsData.find(
      (item) =>
        item.id === Number(id)
    );


  // Fetch Single Post

  useEffect(() => {
    const fetchPost = async () => {
      try {

        const data = await getSinglePost(id)
        console.log(data)
        if (data.success) {
          setPost(data.data)
        }

      } catch (error) {

        console.log('Post Error:', error)

      } finally {
        setLoading(false)

      }
    }
    fetchPost()
  }, [id])


  // Loading

  if (loading) {
    return (

      <h1 className="loading-text">
        Loading...
      </h1>
    )
  }


  // No Post

  if (!post) {

    return (
      <h1 className="not-found-text">
        Post Not Found
      </h1>

    )

  }


  return (

    <>
      <Navbar />

      <div className="post-details-container">
        <div className="post-details-card">
          {
            post.ImageUrl && (
              <div className="post-details-image">
                <img
                  src={`http://localhost:5000/uploads/${post.ImageUrl}`}
                  alt={post.Title}
                />
              </div>
            )
          }

          <div className="post-details-body">
            <div className="post-meta">
              <span>
                Category:
                {post.CategoryId}
              </span>

              <span>
                Author:
                {post.AuthorId}
              </span>

              <span>

                {
                  post.Created_at
                    ? new Date(
                        post.Created_at
                      ).toLocaleDateString()
                    : 'No Date'
                }

              </span>

            </div>


            {/* Dynamic Title */}

            <h1 className="post-details-title">

              {

                translatedPost
                  ?.translations?.[language]
                  ?.title ||

                (

                  language === "hi"
                    ? post.Title_Hi
                    : language === "te"
                    ? post.Title_Te
                    : post.Title_En

                ) ||
                post.Title

              }

            </h1>


            {/* Dynamic Content */}

            <p className="post-details-content">

              {

                translatedPost
                  ?.translations?.[language]
                  ?.description ||

                (

                  language === "hi"
                    ? post.Content_Hi
                    : language === "te"
                    ? post.Content_Te
                    : post.Content_En

                ) ||
                post.Content

              }

            </p>
          </div>
        </div>
      </div>
   <Footer />
    </>
  )
}
export default PostDetails;