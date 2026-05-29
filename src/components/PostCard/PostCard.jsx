import './PostCard.css';
import { useNavigate } from 'react-router-dom';
import translationsData from '../../data/translations.json';

function PostCard({ post,language }) {

  const navigate = useNavigate();
  const translatedPost = translationsData.find( (item) => item.id === post.PostId );

  const title =
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
    post.Title;

  const content =

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
    post.Content;


  return (

    <div

      className="post-card"
      onClick={() => navigate(
          `/post/${post.PostId}?lang=${language}`
        )
      }
    >

      {/* Image Section */}
      <div className="post-image">
        {
          post.ImageUrl ? (
            <img
                src={
    post.ImageUrl?.startsWith("http")
      ? post.ImageUrl
      : `https://blog-application-backend-eight.vercel.app/uploads/${post.ImageUrl}`
  }
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
          CategoryId:{post.CategoryId}
        </p>

        <p className="author">
          AuthorId:{post.AuthorId}
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













// import './PostCard.css';

// import { useNavigate } from 'react-router-dom';

// import translationsData from '../../data/translations.json';

// function PostCard({ post, language }) {

//   console.log(language);

//   const navigate = useNavigate();

//   console.log(post.PostId)

//   // Find translated post
//   const translatedPost = translationsData.find(
//     (item) => item.id === post.PostId
//   );

//   console.log(language);

// console.log(translatedPost);
//   // Dynamic Title
//   const title =

//     translatedPost?.translations?.[language]?.title ||

//     post.Title_En ||

//     post.Title;

//   // Dynamic Content
//   const content =

//     translatedPost?.translations?.[language]?.description ||

//     post.Content_En ||

//     post.Content;

//   return (

//     <div
//       className="post-card"

//       onClick={() =>
//         navigate(
//           `/post/${post.PostId}?lang=${language}`
//         )
//       }
//     >

//       {/* Image Section */}
//       <div className="post-image">

//         {
//           post.ImageUrl ? (

//             <img
//               src={`https://blog-application-backend-eight.vercel.app/uploads/${post.ImageUrl}`}
//               alt={title}
//             />

//           ) : (

//             <div className="no-image">
//               📝
//             </div>

//           )
//         }

//       </div>

//       {/* Body */}
//       <div className="post-body">

//         <p className="category">
//           CategoryId:
//           {post.CategoryId}
//         </p>

//         <p className="author">
//           AuthorId:
//           {post.AuthorId}
//         </p>

//         {/* Title */}
//         <h2 className="title">
//           {title}
//         </h2>

//         {/* Content */}
//         <p className="content">
//           {content}
//         </p>

//         {/* Footer */}
//         <div className="footer">

//           <span>
//             #{post.PostId}
//           </span>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default PostCard;