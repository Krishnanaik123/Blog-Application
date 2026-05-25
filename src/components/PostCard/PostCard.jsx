import './PostCard.css'

import { useNavigate } from 'react-router-dom'

function PostCard({ post, language }) {

  const navigate = useNavigate();

  // Dynamic Language Title
  const title =

    language === "hi"

      ? (
          post.Title_Hi ||
          post.Title_En ||
          post.Title
        )

      : language === "te"

      ? (
          post.Title_Te ||
          post.Title_En ||
          post.Title
        )

      : (
          post.Title_En ||
          post.Title
        );

  // Dynamic Language Content
  const content =

    language === "hi"

      ? (
          post.Content_Hi ||
          post.Content_En ||
          post.Content
        )

      : language === "te"

      ? (
          post.Content_Te ||
          post.Content_En ||
          post.Content
        )

      : (
          post.Content_En ||
          post.Content
        );

  return (

    <div
      className="post-card"

      onClick={() =>
        navigate(
          `/post/${post.PostId}?lang=${language}`
        )
      }
    >

      {/* Image Section */}
      <div className="post-image">

        {
          post.ImageUrl ? (

            <img
              src={`http://localhost:5000/uploads/${post.ImageUrl}`}
              alt={title}
            />

          ) : (

            <div className="no-image">
              📝
            </div>

          )
        }

      </div>

      {/* Body */}
      <div className="post-body">

        <p className="category">
          CategoryId:
          {post.CategoryId}
        </p>

        <p className="author">
          AuthorId:
          {post.AuthorId}
        </p>

        {/* Title */}
        <h2 className="title">
          {title}
        </h2>

        {/* Content */}
        <p className="content">
          {content}
        </p>

        {/* Footer */}
        <div className="footer">

          <span>
            #{post.PostId}
          </span>

        </div>

      </div>

    </div>
  );
}

export default PostCard;