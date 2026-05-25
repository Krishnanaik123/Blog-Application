import './Navbar.css'

import { Link } from 'react-router-dom'

import { getTokenFromCookie }
from '../../utils/auth'

import { logoutUser }
from '../../utils/logout'

import { useSelector }
from "react-redux";

import { useTranslation }
from "react-i18next";


function Navbar() {

  const { t, i18n } =
    useTranslation();

  const user = useSelector(
    (state) => state.auth.user
  );

  const token =
    getTokenFromCookie();

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


          <div className="language-container">

            🌐

            <select
              className="language-dropdown"

              onChange={(e) =>
                i18n.changeLanguage(
                  e.target.value
                )
              }
            >

              <option value="en">
                English
              </option>

              <option value="te">
                Telugu
              </option>

              <option value="hi">
                Hindi
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