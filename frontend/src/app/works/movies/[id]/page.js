'use client' // Directive pour marquer ce fichier comme un composant client

// Importation des dépendances nécessaires
import React, { useState, useEffect, useContext } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '../../../../styles/WorkDetail.css'
import AuthContext from '@/components/AuthContext'
import ReviewForm from '@/components/ReviewForm'
import ReviewCard from '@/components/ReviewCard'

export const dynamic = 'force-dynamic' // Empêche la génération statique au build

function MovieDetail({ params: initialParams }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL 

  // Récupération des informations d'authentification via le contexte
  const { isAuthenticated, user } = useContext(AuthContext)

  // Déclaration des états du composant
  const [params, setParams] = useState(null) // Paramètres à utiliser pour la récupération des détails du film
  const [movie, setMovie] = useState(null) // Détails du film
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const [isAdded, setIsAdded] = useState(false) // État pour savoir si le film est déjà ajouté à la liste
  const [actionError, setActionError] = useState(null) // Erreurs d'actions d'ajout à la liste

  const [reviews, setReviews] = useState([]) // Critiques du films

  // useEffect(() => {
  //   if (isAuthenticated && user?.id) {
  //     console.log("User ID:", user.id);
  //   }
  // }, [isAuthenticated, user]);

  // Utilisation d'un useEffect pour résoudre les paramètres initiaux passés
  useEffect(() => {
    async function resolveParams() {
      if (initialParams instanceof Promise) {
        const resolvedParams = await initialParams
        setParams(resolvedParams)
      } else {
        setParams(initialParams)
      }
    }
    resolveParams()
  }, [initialParams])

  // Fetch des détails d'un film
  useEffect(() => {
    async function fetchMovieDetails() {
      if (params?.id) {
        try {
          setLoading(true)
          const response = await fetch(
            `${API_URL}/api/works/movies/${params.id}`
          )
          if (!response.ok) {
            throw new Error(
              'Erreur lors de la récupération des détails du film.'
            )
          }
          const data = await response.json()
          setMovie(data)
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchMovieDetails()
  }, [params])

  // Fetch des reviews
  useEffect(() => {
    async function fetchReviews() {
      if (params?.id) {
        try {
          const response = await fetch(`${API_URL}/api/reviews/${params.id}`)
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des critiques.')
          }
          const data = await response.json()
          setReviews(data)
        } catch (err) {
          console.error(err)
        }
      }
    }
    fetchReviews()
  }, [params])

  const handleNewReview = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews])
  }  

  // Fonction pour ajouter un film à la liste
  const handleAddToList = async (type) => {
    const token = localStorage.getItem('token') // Récupère le token du localStorage
    if (!token) {
      setActionError(
        'Vous devez être connecté pour ajouter un film à votre liste.'
      )
      return
    }

    try {
      // Décoder le token pour obtenir l'ID utilisateur
      const decodedToken = JSON.parse(atob(token.split('.')[1])) // Décoder le token JWT
      const userId = decodedToken?.id // Extraire l'ID de l'utilisateur

      if (!userId) {
        setActionError('ID utilisateur manquant dans le token.')
        return
      }

      // Envoi de la requête POST avec l'ID de l'utilisateur
      const response = await fetch(`${API_URL}/api/list/add`, {
        method: 'POST', // Méthode HTTP
        headers: {
          'Content-Type': 'application/json', // Type de contenu JSON
          Authorization: `Bearer ${token}`, // Envoie le token dans l'en-tête Authorization
        },
        body: JSON.stringify({
          userId, // Ajoute l'ID de l'utilisateur
          workId: movie.id, // L'ID du film à ajouter
          type, // 'watchlist' ou 'favorites'
          workType: 'film', // Film ou série
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setIsAdded(true)
        setActionError(null)
        alert(`Film ajouté à votre ${type}!`)
      } else {
        const errorData = await response.json()
        setActionError(
          errorData.message || "Erreur lors de l'ajout du film à votre liste."
        )
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err)
      setActionError("Erreur lors de l'ajout du film à votre liste.")
    }
  }

  // Fonction de mise à jour d'une review
  const handleUpdateReview = async (updatedReview) => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(
        `${API_URL}/api/reviews/${updatedReview.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedReview), // Passer les nouvelles données de la critique
        }
      )

      if (response.ok) {
        const data = await response.json()
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === updatedReview.id ? data : review
          )
        )
        alert('Critique mise à jour !')
      } else {
        alert('Erreur lors de la mise à jour de la critique.')
      }
    } catch (error) {
      console.error(error)
      alert('Erreur lors de la mise à jour de la critique.')
    }
  }

  // Fonction de suppression d'une review
  const handleDeleteReview = async (reviewId) => {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`${API_URL}/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.id !== reviewId)
        )
        alert('Critique supprimée !')
      } else {
        alert('Erreur lors de la suppression de la critique.')
      }
    } catch (error) {
      console.error(error)
      alert('Erreur lors de la suppression de la critique.')
    }
  }

  if (!params) {
    return <div className="loading">Chargement des paramètres...</div>
  }

  if (loading) {
    return <div className="loading">Chargement...</div>
  }

  if (error) {
    return (
      <div>
        <Header />
        <p>{error}</p>
        <Footer />
      </div>
    )
  }

  if (!movie) {
    return (
      <div>
        <Header />
        <p>Aucun détail disponible pour ce film.</p>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="work-detail">
        <h1>{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="work-poster"
        />
        <p>
          <strong>Synopsis :</strong> {movie.overview}
        </p>
        <p>
          <strong>Date de sortie :</strong> {movie.release_date}
        </p>
        <p>
          <strong>Note moyenne :</strong> {movie.vote_average} / 10
        </p>

        {/* Boutons d'ajout à la liste */}
        <div className="add-to-list-buttons">
          <button
            onClick={() => handleAddToList('watchlist')}
            disabled={isAdded}
          >
            {isAdded ? 'Ajouté à la Watchlist' : 'Ajouter à ma Watchlist'}
          </button>
          <button
            onClick={() => handleAddToList('favorites')}
            disabled={isAdded}
          >
            {isAdded ? 'Ajouté aux Favoris' : 'Ajouter à mes Favoris'}
          </button>
        </div>
        {actionError && <p className="error">{actionError}</p>}
      </div>

      {/* Formulaire Note et Critique */}
      {isAuthenticated ? (
        <ReviewForm workId={movie.id} userId={user?.id} onReviewAdded={handleNewReview} />
      ) : (
        <p>
          {' '}
          Si vous voulez noter ou faire une critique sur une oeuvre, veuillez
          vous connecter{' '}
        </p>
      )}

      <div className="reviews-section">
        <h2>Critiques des spectateurs sur ce film </h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onUpdate={handleUpdateReview}
              onDelete={handleDeleteReview}
            />
          ))
        ) : (
          <p>Aucune critique pour le moment.</p>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default MovieDetail
