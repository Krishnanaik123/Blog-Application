import { useState } from 'react'
import { loginUser } from '../../Services/authService'
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import { useNavigate } from 'react-router-dom';
import './Login.css'

 function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value

    })
  }

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const data = await loginUser(formData)
       if (data.success) {
    alert('Login Successful')
    dispatch(setUser(data))
    console.log(data);
    setTimeout(() => {
        navigate('/')
    }, 500)
} else {

  alert(data.message)
}
 } catch (error) {
      console.log(error)
      alert('Invalid Username or Password')
    }
  }

  return (

    <div className="container">
      <div className="form-card">
        <h1>  Login </h1>
        <form onSubmit={handleSubmit}>

          {/* Username */}
    <div className="input-group">
            <label> UserName </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
     </div>

          {/* Password */}
        <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn-submit"
          >
            Login
          </button>
        </form>
        <p className="auth-switch">
                Don't have an account?
            <span
                 onClick={() => window.location.href = '/signup'}
             >Signup</span>
         </p>
      </div>
    </div>
  )
}

export default Login