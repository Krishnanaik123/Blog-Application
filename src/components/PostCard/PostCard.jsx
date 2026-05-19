import './PostCard.css'
import { useNavigate } from 'react-router-dom'

function PostCard({ post }) {
  const navigate = useNavigate()
  return (
    <div
      className="post-card"
      onClick={() => navigate(`/post/${post.PostId}`)}
    >
      <div className="post-image">
        {
             post.ImageUrl ? (
            <img
              src={`http://localhost:5000/uploads/${post.ImageUrl}`}
              alt={post.Title}
            />

          ) : (

            <div className="no-image">
              📝
            </div>

          )
        }

      </div>

      <div className="post-body">
        <p className="category">
          CategoryId: {post.CategoryId}
        </p>

        <p className="author">
          AuthorId: {post.AuthorId}
        </p>

        <h2 className="title">
          {post.Title}
        </h2>

        <p className="content">
          {post.Content}
        </p>

        <div className="footer">
          <span>
            #{post.PostId}
          </span>

        </div>
      </div>
    </div>
  )
}

export default PostCard