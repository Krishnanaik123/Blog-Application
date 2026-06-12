import { useEffect } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { getTokenFromCookie } from '../../utils/auth'
import { logoutUser } from '../../utils/logout'
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"


function Navbar({ categories = [], selectedCategory = '', setSelectedCategory, searchText = '',
  setSearchText }) {
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const token = getTokenFromCookie();
  const navigate = useNavigate();

  // Persist Language After Refresh
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  // Handle Language Change
  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    if (selectedLang) { 
      i18n.changeLanguage(selectedLang);
      localStorage.setItem("selectedLanguage", selectedLang);
    }
  };

  // Conditional Click Handler for Create Post
  const handleCreatePostClick = (e) => {
    if (!token) {
      e.preventDefault(); // Intercepts and stops the React Router navigation
      alert("Please Login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* LEFT SECTION: Logo & User Status */}
        <div className="nav-brand-group">
          <h2 className="logo" onClick={() => navigate('/')}>
            📝 BlogApp
          </h2>
          {token && user?.username && (
            <span className="user-profile-badge">@{user.username}</span>
          )}
        </div>

        {/* MIDDLE SECTION: Navigation Core Links */}
        <div className="nav-menu-links">
          <Link to="/" className="nav-link-item">{t("home")}</Link>
          
          {/* "Create Post" is now ALWAYS visible. Click intercepted if logged out. */}
          <Link 
            to="/create" 
            className="nav-link-item" 
            onClick={handleCreatePostClick}
          >
            {t("createPost")}
          </Link>
        </div>

        {/* RIGHT SECTION: Filters, Settings, Actions */}
        <div className="nav-actions-group">
          
          {/* Relocated Categories Dropdown */}
          {categories.length > 0 && setSelectedCategory && (
            <div className="navbar-category-wrapper">
              <select
                className="navbar-category-dropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.CategoryId} value={cat.CategoryId}>
                    {cat.CategoryName || cat.name || `Category ${cat.CategoryId}`}
                  </option>
                ))}
              </select>
            </div>
          )}
              <input
                    type="text"
                    placeholder=" Posts..."
                    value={searchText}
                    onChange={async (e) => {
                      setSearchText(e.target.value)
                      if (e.target.value.trim()) {
                      
                        // results parent component ki pass cheyyali
                      }
                    }}
                    className="search-box"
                  />

          {/* Language Selector */}
          <div className="language-wrapper">
            <select
              className="language-dropdown"
              value={i18n.language}
              onChange={handleLanguageChange}
            >
              <option value="en">EN</option>
              <option value="te">తె</option>
              <option value="hi">हिं</option>
            </select>
          </div>

          {/* Dynamic Auth Actions Block */}
          <div className="auth-action-wrapper">
            {token ? (
              <button className="logout-btn" onClick={logoutUser}>
                {t("logout")}
              </button>
            ) : (
              <div className="auth-guest-links">
                <Link to="/login" className="login-link-btn">{t("login")}</Link>
                <Link to="/signup" className="signup-link-btn">{t("signup")}</Link>
              </div>
            )}
          </div>

        </div>

      </div>
    </nav>
  )
}

export default Navbar