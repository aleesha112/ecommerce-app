import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSendOtp(e) {
    e.preventDefault()
    setLoading(true)
    fetch("https://ecommerce-backend-production-5790.up.railway.app/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'OTP sent to your email') {
          toast.success("OTP sent to your email!")
          setStep(2)
        } else {
          toast.error(data.message || "Failed to send OTP")
        }
        setLoading(false)
      })
  }

  function handleResetPassword(e) {
    e.preventDefault()
    setLoading(true)
    fetch("https://ecommerce-backend-production-5790.up.railway.app/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Password reset successfully') {
          toast.success("Password reset! Please login.")
          navigate("/login")
        } else {
          toast.error(data.message || "Failed to reset password")
        }
        setLoading(false)
      })
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Forgot Password</h1>
        <p className="auth-subtitle">
          {step === 1 ? "Enter your email to receive OTP" : "Enter OTP and new password"}
        </p>

        {step === 1 ? (
          <form onSubmit={handleSendOtp}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '10px' }}>OTP sent to: <strong>{email}</strong></p>
            <input type="text" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} required />
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <button type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            <button type="button" onClick={() => setStep(1)} style={{ background: 'none', color: '#888', border: '1px solid #ddd', marginTop: '8px' }}>← Back</button>
          </form>
        )}

        <p className="auth-switch"><Link to="/login">← Back to Login</Link></p>
      </div>
    </div>
  )
}

export default ForgotPassword