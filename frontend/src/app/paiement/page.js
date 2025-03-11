'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './styles/DonationPage.css'

export default function DonationPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL 

  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDonate = async () => {
    if (!amount || amount < 1) {
      alert('Veuillez entrer un montant valide')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `${API_URL}/api/stripe/create-donation-session`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount }),
        }
      )

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url // Redirige vers Stripe Checkout
      } else {
        alert('Erreur : ' + data.error)
      }
    } catch (error) {
      console.error('Erreur lors du paiement :', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Header />
      <div className="donation-container">
        <h1>Faire un don</h1>
        <input
          type="number"
          placeholder="Montant (€)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleDonate} disabled={loading}>
          {loading ? 'Redirection...' : 'Faire un don'}
        </button>
      </div>
      <Footer />
    </div>
  )
}
