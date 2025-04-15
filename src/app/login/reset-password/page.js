'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [accessToken, setAccessToken] = useState(null)
  const [message, setMessage] = useState('')
  const router = useRouter()

  // Grab the access_token from the URL hash on page load
  useEffect(() => {
    const hash = window.location.hash
    const params = new URLSearchParams(hash.slice(1))
    const token = params.get('access_token')
    if (token) {
      setAccessToken(token)
    } else {
      setMessage('Invalid or missing token.')
    }
  }, [])

  const handleReset = async (e) => {
    e.preventDefault()
    if (!accessToken) {
      setMessage('Invalid reset link.')
      return
    }

    const { error } = await supabase.auth.api.updateUser(accessToken, {
      password: newPassword,
    })

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Password reset! Redirecting to login...')
      setTimeout(() => router.push('/login'), 2000)
    }
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', backgroundColor: '#692B2C'
    }}>
      <form onSubmit={handleReset} style={{
        backgroundColor: 'white', padding: '2rem', borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', color: '#692B2C' }}>Reset Password</h2>
        {message && <p style={{ color: 'black', textAlign: 'center' }}>{message}</p>}

        <input
          type="password"
          placeholder="Enter new password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '1rem 0', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <button type="submit" style={{
          width: '100%', padding: '10px', backgroundColor: '#D9AC42',
          border: 'none', color: 'white', fontWeight: 'bold', borderRadius: '4px'
        }}>
          Submit
        </button>
      </form>
    </div>
  )
}
