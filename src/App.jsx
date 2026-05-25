import { Routes, Route }
from 'react-router-dom'

import Home
from './pages/Home/Home'

import PostDetails
from './pages/PostDetails/PostDetails'

import Signup
from './pages/Signup/Signup'

import Login
from './pages/Login/Login'

import CreatePost
from './pages/CreatePost/CreatePost'

import English
from './pages/English/EnglishPosts'

import Hindi
from './pages/Hindi/HindiPosts'

import Telugu
from './pages/Telugu/TeluguPosts'

import ProtectedRoute
from './routes/ProtectedRoute'


function App() {

  return (

    <>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/post/:id"
          element={<PostDetails />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/english-posts"
          element={<English />}
        />

        <Route
          path="/hindi-posts"
          element={<Hindi />}
        />

        <Route
          path="/telugu-posts"
          element={<Telugu />}
        />

      </Routes>

    </>

  )
}

export default App