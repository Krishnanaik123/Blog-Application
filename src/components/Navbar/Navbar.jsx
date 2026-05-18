import './Navbar.css'
import { Link } from 'react-router-dom'
import { getTokenFromCookie } from '../../utils/auth'
import { logoutUser } from '../../utils/logout'

function Navbar() {
  const token = getTokenFromCookie()
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo">
          📝 BlogApp
        </h2>
        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/create">
            Create Post
          </Link>

          {
            token ? (

              <button
                className="logout-btn"
                onClick={logoutUser}
              >
                Logout
              </button>

            ) : (

              <>

                <Link to="/login">
                  Login
                </Link>

                <Link to="/signup">
                  Signup
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