import { Navigate } from 'react-router-dom'
import { getTokenFromCookie } from '../utils/auth'

function ProtectedRoute({ children }) {
  const token = getTokenFromCookie()
  // No Token
  if (!token) {
    alert('Session Expired. Please Login')
    return <Navigate to="/login" />
  }
  // Authorized
  return children
}
export default ProtectedRoute