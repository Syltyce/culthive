"use client";

import React, { useState, useEffect } from 'react';
import '../styles/ReviewForm.css';

function ReviewForm({ workId }) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifier la présence du token dans le localStorage au démarrage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // L'utilisateur est connecté
    } else {
      setIsLoggedIn(false); // L'utilisateur est déconnecté
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Vous devez être connecté pour soumettre une review");
      }

      const response = await fetch(`http://localhost:3000/api/reviews/works/${workId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, title, comment }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      console.log('Review créée avec succès:', await response.json());
      setIsSubmitting(false);
      setRating(0);
      setTitle('');
      setComment('');
    } catch (error) {
      console.error('Erreur lors de la création de la review:', error);
      setErrorMessage(error.message || 'Une erreur s\'est produite');
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-message">
        <p>Veuillez vous connecter pour ajouter une review.</p>
      </div>
    );
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2>Ajouter une Review</h2>

      <div className="form-group">
        <label>Note :</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="10"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Titre (optionnel) :</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Commentaire :</label>
        <textarea
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
  );
}

export default ReviewForm;
