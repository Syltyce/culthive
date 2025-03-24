'use client'

import React, { useState, useEffect } from 'react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const VerifyEmailPage = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true) // État de chargement

  useEffect(() => {
    const verifyEmail = async () => {
      // Récupérer le code directement à partir de l'URL
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      console.log(code)

      if (!code) {
        setError("Code de vérification manquant dans l'URL.")
        setLoading(false)
        return
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/verify-email`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          }
        )

        const data = await res.json()

        if (res.status === 200) {
          setSuccess('Votre email a été vérifié avec succès !')
          setTimeout(() => {
            window.location.href = '/users/login' // Rediriger vers la page de connexion
          }, 2000)
        } else {
          setError(data.message)
        }
      } catch (err) {
        setError('Erreur serveur')
      }

      setLoading(false)
    }

    verifyEmail()
  }, [])

  if (loading) {
    return <div>Chargement...</div> // Afficher un message de chargement
  }

  return (
    <div>
      <Header />
      <h1>Vérification de l'email</h1>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <Footer />
    </div>
  )
}

export default VerifyEmailPage
