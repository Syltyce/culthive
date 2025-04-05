'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import './style_reset-password.css'

function ResetPasswordContent() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()

  // Récupérer le token depuis l'URL
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setError('Token manquant ou invalide.')
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!token) return

    try {
      const res = await fetch(
        `${API_URL}/api/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, password }),
        }
      )

      const data = await res.json()

      if (res.ok) {
        setMessage(data.message)
        setTimeout(() => router.push('/users/login'), 3000)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Une erreur est survenue.')
    }
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Réinitialiser le mot de passe</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={!token}>
            Réinitialiser
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <ResetPasswordContent />
    </Suspense>
  )
}
