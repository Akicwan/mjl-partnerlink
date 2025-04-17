'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient' 

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const accessToken = searchParams.get('access_token')

  const handlePasswordReset = async (e) => {
    e.preventDefault()

    if (!accessToken || !newPassword) {
      setMessage('Missing access token or password')
      return
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      setMessage(error.message)
    } else {
      setIsSuccess(true)
      setMessage('Password successfully updated! Redirecting to login...')
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }
  }

  return (
    <div style={{
      height: '100vh',
      backgroundColor: '#692B2C',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <form onSubmit={handlePasswordReset} style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        <h2 style={{ textAlign: 'center', color: '#692B2C' }}>Reset Your Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
            color: 'black',
          }}
        />

        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#D9AC42',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}>
          Update Password
        </button>

        {message && (
          <p style={{
            color: isSuccess ? 'green' : 'red',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
