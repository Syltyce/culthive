'use client'

import React, { useState, useEffect } from 'react'
import '../styles/ReviewForm.css'

function ReviewForm({ workId }) {

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setIsLoggedIn(true)
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])) // Décoder le token JWT
        setUserId(decodedToken.id) // Récupère l'ID de l'user dans le Token
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error)
      }
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const handleStarClick = (ratingValue) => {
    setRating(ratingValue)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    // Vérifie les valeurs de userId et workId avant d'envoyer
    console.log('userId:', userId)
    console.log('workId:', workId)

    try {
      if (!userId || !workId) {
        throw new Error('Utilisateur ou œuvre manquants')
      }

      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Vous devez être connecté pour soumettre une review')
      }

      const response = await fetch(`${API_URL}/api/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId, // Ajout de userId
          workId, // Ajout de workId
          rating,
          title,
          comment,
        }),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      console.log('Review créée avec succès:', await response.json())
      setIsSubmitting(false)
      setRating(0)
      setTitle('')
      setComment('')
    } catch (error) {
      console.error('Erreur lors de la création de la review:', error)
      setErrorMessage(error.message || "Une erreur s'est produite")
      setIsSubmitting(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="login-message">
        <p>Veuillez vous connecter pour ajouter une review.</p>
      </div>
    )
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2>Ajouter une Review</h2>

      <div className="form-group">
        <label htmlFor="rating">Note :</label>
        <input
          id="rating"
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="10"
          className="form-input"
        />
      </div>

      <div className="star-rating">
        {[...Array(10)].map((_, index) => (
          <span
            key={index}
            className={`star ${rating > index ? 'selected' : ''}`}
            onClick={() => handleStarClick(index + 1)}
            data-testid={`star-${index}`}
          >
            ★
          </span>
        ))}
      </div>

      <div className="form-group">
        <label htmlFor="titre">Titre (optionnel) :</label>
        <input
          id="titre"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="commentaire">Commentaire :</label>
        <textarea
          id="commentaire"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="form-textarea"
        />
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <button type="submit" disabled={isSubmitting} className="submit-btn">
        {isSubmitting ? 'En cours...' : 'Ajouter une review'}
      </button>
    </form>
  )
}

export default ReviewForm
