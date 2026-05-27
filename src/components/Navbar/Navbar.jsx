import { useEffect } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { getTokenFromCookie } from '../../utils/auth'
import { logoutUser } from '../../utils/logout'
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"


function Navbar() {

  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const token = getTokenFromCookie();


  // Persist Language After Refresh

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
        "selectedLanguage"
      );

    if (savedLanguage) {
      i18n.changeLanguage(
        savedLanguage
      );

    }

  }, []);


  // Handle Language Change

  const handleLanguageChange = (event) => {

      const selectedLang = event.target.value;

      if (selectedLang) { i18n.changeLanguage(
          selectedLang
        );

        // Save Language

        localStorage.setItem(
          "selectedLanguage",
          selectedLang
        );
      }
    };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo">
          📝 BlogApp
        </h2>

        <h2>
          {user?.username}
        </h2>


        <div className="nav-links">
          <Link to="/">
            {t("home")}
          </Link>


          {/* Language Dropdown */}

          <div className="language-wrapper">

            <select
              className="language-dropdown"
              value={i18n.language}
              onChange={ handleLanguageChange }

            >
              <option value="en">
                English
              </option>

              <option value="te">
                తెలుగు
              </option>

              <option value="hi">
                हिंदी
              </option>
            </select>

          </div>


          <Link to="/create">
            {t("createPost")}
          </Link>


          {

            token ? (
              <button
                className="logout-btn"
                onClick={logoutUser}
              >
                {t("logout")}
              </button>
            ) : (

              <>
                <Link to="/login">
                  {t("login")}
                </Link>

                <Link to="/signup">
                  {t("signup")}
                </Link>
              </>
            )
         }
        </div>
      </div>
    </nav>
  )
}

export default Navbar