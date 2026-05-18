import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import PostDetails from './pages/PostDetails/PostDetails'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import CreatePost from './pages/CreatePost/CreatePost'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {

  return (

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

    </Routes>
  )
}

export default App