import { useState } from 'react'
import { signupUser } from '../../Services/authService'
import './Signup.css'

function Signup() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    })
  }
  const handleSubmit = async (e) => {

    e.preventDefault()

    try {
      if (
        formData.password !==
        formData.confirmPassword
      ) {

        alert('Passwords do not match')

        return
      }

      const data = await signupUser(formData)

      console.log(data)

      if (data.success) {

        alert('Signup Successful')

            // Redirect Login
         window.location.href = '/login'
      } else {

        alert(data.message)
      }

    } catch (error) {

      console.log(error.response?.data)

      alert(
        error.response?.data?.message ||
        'Signup Failed'
      )
    }
  }

  return (

    <div className="container">

      <div className="form-card">

        <h1>
          Sign Up
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className="input-group">

            <label>
              UserName
            </label>

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

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          {/* Confirm Password */}
          <div className="input-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn-submit"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  )
}

export default Signup