'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'  // Adjust the path if necessary

export default function LoginPage() {
  // States for form inputs and messages
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isForgotPassword, setIsForgotPassword] = useState(false)  // For toggling the reset password form

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess('Login successful!')
      console.log('User:', data.user)
    }
  }

  // Handle forgot password functionality
  const handleForgotPassword = async (e) => {
    e.preventDefault()
  
    setError('')
    setSuccess('')
  
    // Request a password reset email using the correct Supabase method
    const { error } = await supabase.auth.resetPasswordForEmail(email)
  
    if (error) {
      setError('Error sending reset email. Please try again.')
    } else {
      setSuccess('Password reset email sent! Please check your inbox.')
      setIsForgotPassword(false)  // Close the reset password form after success
    }
}
  

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', backgroundColor: '#692B2C'
    }}>
      <form onSubmit={isForgotPassword ? handleForgotPassword : handleLogin} style={{
        backgroundColor: 'white', padding: '2rem', borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <img
          src="/MJL-logo.png"  // Make sure your logo is in the public folder
          alt="MJL PartnerLink Logo"
          style={{
            width: '150px',
            height: '150px',
            marginBottom: '1rem',
            objectFit: 'contain'
          }}
        />

        {/* Conditionally render either login or reset password form */}
        {!isForgotPassword ? (
          <>
            <div style={{ marginBottom: '1rem', width: '100%' }}>
              <label style={{ color: 'black', fontSize: '14px' }}>Email:</label><br />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px',
                  backgroundColor: '#f9f9f9', color: 'black', fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '0.5rem', width: '100%' }}>
              <label style={{ color: 'black', fontSize: '14px' }}>Password:</label><br />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px',
                  backgroundColor: '#f9f9f9', color: 'black', fontSize: '14px'
                }}
              />
            </div>

            {/* Forgot Password Link */}
            <div style={{ width: '100%', textAlign: 'right', marginBottom: '1rem' }}>
              <a href="#" onClick={() => setIsForgotPassword(true)} style={{
                fontSize: '13px',
                color: '#6A2E1F',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>
                Forgot Password?
              </a>
            </div>

            <button type="submit" style={{
              width: '100%', padding: '10px', border: 'none', borderRadius: '4px',
              backgroundColor: '#D9AC42', color: 'white', fontSize: '16px', cursor: 'pointer'
            }}>
              Login
            </button>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '1rem', width: '100%' }}>
              <label style={{ color: 'black', fontSize: '14px' }}>Enter your email:</label><br />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px',
                  backgroundColor: '#f9f9f9', color: 'black', fontSize: '14px'
                }}
              />
            </div>

            <button type="submit" style={{
              width: '100%', padding: '10px', border: 'none', borderRadius: '4px',
              backgroundColor: '#D9AC42', color: 'white', fontSize: '16px', cursor: 'pointer'
            }}>
              Reset Password
            </button>

            <div style={{ width: '100%', textAlign: 'left', marginTop: '1rem' }}>
              <a href="#" onClick={() => setIsForgotPassword(false)} style={{
                fontSize: '13px',
                color: '#6A2E1F',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>
                Back to Login
              </a>
            </div>
          </>
        )}

        {/* Display error or success messages */}
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: '1rem' }}>{success}</p>}
      </form>
    </div>
  )
}
