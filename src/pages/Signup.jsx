import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

function Signup() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
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

  function handleSendOtp(e) {
    e.preventDefault()

    if (passwordErrors.length > 0) {
      toast.error("Please fix password requirements first")
      return
    }

    setLoading(true)

    fetch("https://ecommerce-backend-production-5790.up.railway.app/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'OTP sent successfully') {
          toast.success("OTP sent to your email!")
          setStep(2)
        } else {
          toast.error(data.message || "Failed to send OTP")
        }
        setLoading(false)
      })
      .catch(() => {
        toast.error("Something went wrong")
        setLoading(false)
      })
  }

  function handleVerifyOtp(e) {
    e.preventDefault()
    setLoading(true)

    fetch("https://ecommerce-backend-production-5790.up.railway.app/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, otp })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          login(data.user, data.token)
          toast.success(`Welcome, ${data.user.name}!`)
          navigate("/")
        } else {
          toast.error(data.message || "Invalid OTP")
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
        <p className="auth-subtitle">
          {step === 1 ? "Fill in your details" : "Enter OTP sent to your email"}
        </p>

        {step === 1 ? (
          <form onSubmit={handleSendOtp}>
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
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '10px' }}>
              OTP sent to: <strong>{email}</strong>
            </p>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Create Account"}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{ background: 'none', color: '#888', border: '1px solid #ddd', marginTop: '8px' }}
            >
              ← Back
            </button>
          </form>
        )}

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup