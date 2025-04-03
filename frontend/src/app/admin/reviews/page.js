'use client'
import { useEffect, useState } from 'react'

import Header from '@/components/Header'
import Footer from '@/components/Footer' 

import '../styles/AdminReviews.css' 

export default function ReviewsPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const [reviews, setReviews] = useState([])

  // Fonction pour récupérer les reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/reviews`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (!response.ok)
          throw new Error('Erreur lors de la récupération des reviews')
        const data = await response.json()
        setReviews(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchReviews()
  }, [])

  // Fonction pour supprimer une review
  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!response.ok)
        throw new Error('Erreur lors de la suppression de la review')

      const data = await response.json()
      console.log('Review supprimée : ', data)

      // Mettre à jour l'état des reviews après suppression
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      )
    } catch (error) {
      console.error('Erreur lors de la suppression :', error)
    }
  }

  return (
    <div className='page-container'>
      <Header />
      <div className='admin-reviews'>
        <h1>Gestion des Critiques</h1>
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <strong>{review.title}</strong> - {review.comment} (par{' '}
              {review.User?.email || 'Utilisateur inconnu'})
              <button onClick={() => handleDeleteReview(review.id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  )
}
