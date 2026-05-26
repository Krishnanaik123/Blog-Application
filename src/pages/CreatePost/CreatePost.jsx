import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getTokenFromCookie } from '../../utils/auth'
import { useTranslation } from "react-i18next";
import './CreatePost.css'

function CreatePost() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title_en: '',
    content_en: '',
    category_id: '',
    AuthorId: '',
    image: null

  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  // Load Categories

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);
        setCategoriesError(null);
        const response = await fetch(
          'http://localhost:5000/api/getCategories'
        );

        if (!response.ok) {

          throw new Error(
            `API error: ${response.status}`
          );

        }

        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        } else {

          setCategoriesError(
            data.message ||
            'Failed to load categories'
          );
        }

      } catch (error) {
        console.log(error);
        setCategoriesError(
          error.message ||
          'Error loading categories'
        );

      } finally {
        setCategoriesLoading(false);
      }
    };
    loadCategories();
  }, []);


  // Handle Inputs

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData,
        image: files[0]
      });

    } else {

      setFormData({ ...formData,[name]: value });
    }
  };


  // Submit Form

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const form = new FormData();
      form.append( 'title_en',formData.title_en );
      form.append('content_en',formData.content_en );
      form.append('category_id',formData.category_id );
      form.append('AuthorId',formData.AuthorId);

      // Image

      if (formData.image) {
        form.append('image',formData.image);
      }

      // Token

      const token = getTokenFromCookie();

      console.log( "TOKEN =>", token);

      // API Call

      const response = await fetch(
        'http://localhost:5000/api/blogPosts',
        {
          method: 'POST',
          headers: {
            Authorization:
            `Bearer ${token}`
          },
          credentials: 'include',
          body: form
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert( 'Post Created Successfully');
        window.location.href = '/';
      } else {
        alert(data.message);
      }

    } catch (error) {

      console.log( "CREATE POST ERROR =>", error);
      alert(
        'Failed To Create Post'
      );

    } finally {
      setLoading(false);
    }
  };


  return (

    <>

      <Navbar />
      <main className="container">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>
              {t("createNewPost")}
            </h2>

            <p>
              {t("shareStory")}
            </p>
          </div>
          <form onSubmit={handleSubmit}>

            {

              categoriesError && (
                <div className="error-message">
                  Error loading categories:
                  {categoriesError}
                </div>
              )
            }
            {
              categoriesLoading && (
                <div className="loading-message">
                  Loading categories...
                </div>
              )
            }


            {/* English Title */}

            <div className="form-group">
              <label>
                {t("englishTitle")}
              </label>

              <input
                type="text"
                name="title_en"
                value={formData.title_en}
                onChange={handleChange}
                placeholder={t("enterEnglishTitle")}
                required
              />

            </div>


            {/* English Content */}

            <div className="form-group">
              <label>
                {t("englishContent")}
              </label>

              <textarea
                rows="8"
                name="content_en"
                value={formData.content_en}
                onChange={handleChange}
                placeholder={t("writeEnglishContent")}
                required
              />

            </div>


            {/* Category + Author */}

            <div className="form-row">
              <div className="form-group">
                <label>
                  {t("category")}
                </label>

                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    {t("selectCategory")}
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
                  {t("authorId")}
                </label>

                <input
                  type="number"
                  name="AuthorId"
                  value={formData.AuthorId}
                  onChange={handleChange}
                  placeholder={t("enterAuthorId")}
                  required
                />

              </div>

            </div>


            {/* Image Upload */}

            <div className="form-group">
              <label>
                {t("uploadImage")}
              </label>

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>


            {/* Submit Button */}

            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >

              {

                loading
                  ? t("publishing")
                  : t("publishPost")
              }

            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
export default CreatePost;