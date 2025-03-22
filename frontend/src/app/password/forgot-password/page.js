'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './style_forgot-password.css'

export default function ForgotPassword() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const res = await fetch(`${API_URL}/api/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage(data.message)
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
        <h1>Mot de passe oublié</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Envoyer</button>
        </form>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </div>
      <Footer />
    </div>
  )
}
