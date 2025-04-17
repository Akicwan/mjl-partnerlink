'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabaseClient'  // Correct import path

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (event) => {
    event.preventDefault()

    // Authenticate the user with Supabase
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError) {
      setError(loginError.message)
      return
    }

    // If login is successful, check the user's role
    const user = data.user
    if (user) {
      // Fetch user data (e.g., role from a user profile table in Supabase)
      const { data: userProfile, error: profileError } = await supabase
        .from('users') // Assuming you have a users table with a role column
        .select('role')
        .eq('id', user.id)
        .single()

      if (profileError) {
        setError(profileError.message)
        return
      }

      // Redirect based on role
      if (userProfile.role === 'admin') {
        router.push('/admin')  // Redirect to admin page
      } else if (userProfile.role === 'partner') {
        router.push('/partner')  // Redirect to partner page
      } else {
        setError('Invalid role or access denied.')
      }
    }
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', backgroundColor: '#692B2C' // Brownish maroon color
    }}>
      <form onSubmit={handleLogin} style={{
        backgroundColor: 'white', padding: '2rem', borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        {/* Logo Placeholder */}
        <img 
          src="/MJL-logo.png" 
          alt="MJL PartnerLink Logo" 
          style={{
            width: '150px',
            height: '150px',
            marginBottom: '1rem',
            objectFit: 'contain'
          }} 
        />
        <div style={{ marginBottom: '1rem', width: '100%' }}>
          <label style={{ color: 'black', fontSize: '14px' }}>Email:</label><br />
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px',
              backgroundColor: '#f9f9f9', color: 'black', fontSize: '14px'
            }}
          />
        </div>

        {/* Error Message */}
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

        <button type="submit" style={{
          width: '100%', padding: '10px', border: 'none', borderRadius: '4px',
          backgroundColor: '#D9AC42', color: 'white', fontSize: '16px', cursor: 'pointer'
        }}>
          Login
        </button>
      </form>
    </div>
  )
}
