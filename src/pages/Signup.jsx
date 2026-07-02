import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const passwordErrors = []
  if (password.length > 0) {
    if (password.length < 8) passwordErrors.push("At least 8 characters")
    if (!/[A-Z]/.test(password)) passwordErrors.push("At least 1 uppercase letter")
    if (!/[0-9]/.test(password)) passwordErrors.push("At least 1 number")
    if (!/[!@#$%^&*]/.test(password)) passwordErrors.push("At least 1 special character (!@#$%^&*)")
  }

  function handleSignup(e) {
    e.preventDefault()

    if (passwordErrors.length > 0) {
      toast.error("Please fix password requirements first")
      return
    }


    setLoading(true)

    fetch("https://ecommerce-backend-production-a8b5.up.railway.app/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          login(data.user, data.token)
          toast.success(`Welcome, ${data.user.name}!`)
          navigate("/")
        } else {
          toast.error(data.message || "Signup failed")
        }
        setLoading(false)
      })
      .catch(() => {
        toast.error("Something went wrong")
        setLoading(false)
      })
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="auth-subtitle">Join us today</p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordErrors.length > 0 && (
            <div className="password-errors">
              {passwordErrors.map((err, index) => (
                <p key={index} className="password-error">✗ {err}</p>
              ))}
            </div>
          )}
          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup