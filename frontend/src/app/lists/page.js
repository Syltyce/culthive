'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useRouter } from 'next/navigation'
import '../../styles/ListsPage.css'

function ListsPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const [moviesWatchlist, setMoviesWatchlist] = useState([])
  const [seriesWatchlist, setSeriesWatchlist] = useState([])
  const [moviesFavorites, setMoviesFavorites] = useState([])
  const [seriesFavorites, setSeriesFavorites] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/users/login')
    } else {
      const decodedToken = JSON.parse(atob(token.split('.')[1]))
      const userId = decodedToken?.id

      if (!userId) {
        setError('ID utilisateur manquant dans le token.')
        return
      }

      const fetchUserLists = async () => {
        try {
          setLoading(true)

          // Récupère les watchlist
          const watchlistResponse = await fetch(
            `${API_URL}/api/list/list?userId=${userId}&type=watchlist`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )

          if (!watchlistResponse.ok) {
            throw new Error('Erreur lors de la récupération de la Watchlist.')
          }

          const watchlistData = await watchlistResponse.json()

          // Sépare les films et séries dans la watchlist
          const moviesWatchlistData = watchlistData.filter(
            (item) => item.workType === 'film'
          )
          const seriesWatchlistData = watchlistData.filter(
            (item) => item.workType === 'serie'
          )

          // Récupère les détails des films et séries dans la watchlist
          const fetchWorkDetails = async (workId, workType) => {
            const response = await fetch(
              `${API_URL}/api/list/details/${workId}/${workType}`
            )

            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des détails.')
            }

            return await response.json()
          }

          const moviesWatchlistDetails = await Promise.all(
            moviesWatchlistData.map(async (item) => {
              return await fetchWorkDetails(item.workId, 'film')
            })
          )

          const seriesWatchlistDetails = await Promise.all(
            seriesWatchlistData.map(async (item) => {
              return await fetchWorkDetails(item.workId, 'serie')
            })
          )

          setMoviesWatchlist(moviesWatchlistDetails)
          setSeriesWatchlist(seriesWatchlistDetails)

          // Récupère les favoris
          const favoritesResponse = await fetch(
            `${API_URL}/api/list/list?userId=${userId}&type=favorites`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )

          if (!favoritesResponse.ok) {
            throw new Error('Erreur lors de la récupération des Favoris.')
          }

          const favoritesData = await favoritesResponse.json()

          // Sépare les films et séries dans les favoris
          const moviesFavoritesData = favoritesData.filter(
            (item) => item.workType === 'film'
          )
          const seriesFavoritesData = favoritesData.filter(
            (item) => item.workType === 'serie'
          )

          const moviesFavoritesDetails = await Promise.all(
            moviesFavoritesData.map(async (item) => {
              return await fetchWorkDetails(item.workId, 'film')
            })
          )

          const seriesFavoritesDetails = await Promise.all(
            seriesFavoritesData.map(async (item) => {
              return await fetchWorkDetails(item.workId, 'serie')
            })
          )

          setMoviesFavorites(moviesFavoritesDetails)
          setSeriesFavorites(seriesFavoritesDetails)
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }

      fetchUserLists()
    }
  }, [router])

  const handleRemove = async (workId, type) => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/users/login')
      return
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]))
    const userId = decodedToken?.id

    try {
      const response = await fetch(`${API_URL}/api/list/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, workId, type }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression.')
      }

      // Mise à jour de l'affichage après suppression
      if (type === 'watchlist') {
        setMoviesWatchlist(moviesWatchlist.filter((item) => item.id !== workId))
        setSeriesWatchlist(seriesWatchlist.filter((item) => item.id !== workId))
      } else if (type === 'favorites') {
        setMoviesFavorites(moviesFavorites.filter((item) => item.id !== workId))
        setSeriesFavorites(seriesFavorites.filter((item) => item.id !== workId))
      }
    } catch (error) {
      console.error('Erreur :', error)
      setError('Erreur lors de la suppression.')
    }
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading">Chargement des listes...</div>
        <Footer />
      </div>
    )
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

  return (
    <div>
      <Header />
      <div className="lists-page">
        <h1>Mes Listes</h1>

        {/* Movies Watchlist */}
        <div className="list-section">
          <h2>Watchlist - Films</h2>
          {moviesWatchlist.length === 0 ? (
            <p>Vous n'avez pas de films dans votre Watchlist.</p>
          ) : (
            <div className="list-items">
              {moviesWatchlist.map((item) => (
                <div key={item.id} className="list-item">
                  <h3>{item.title || 'Titre non disponible'}</h3>
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : '/default-image.jpg'
                    }
                    alt={item.title || 'Image indisponible'}
                    className="list-item-poster"
                  />

                  <button onClick={() => handleRemove(item.id, 'watchlist')}>
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Series Watchlist */}
        <div className="list-section">
          <h2>Watchlist - Séries</h2>
          {seriesWatchlist.length === 0 ? (
            <p>Vous n'avez pas de séries dans votre Watchlist.</p>
          ) : (
            <div className="list-items">
              {seriesWatchlist.map((item) => (
                <div key={item.id} className="list-item">
                  <h3>{item.name || 'Titre non disponible'}</h3>
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : '/default-image.jpg'
                    }
                    alt={item.name || 'Image indisponible'}
                    className="list-item-poster"
                  />

                  <button onClick={() => handleRemove(item.id, 'watchlist')}>
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Movies Favorites */}
        <div className="list-section">
          <h2>Favoris - Films</h2>
          {moviesFavorites.length === 0 ? (
            <p>Vous n'avez pas de films dans vos Favoris.</p>
          ) : (
            <div className="list-items">
              {moviesFavorites.map((item) => (
                <div key={item.id} className="list-item">
                  <h3>{item.title || 'Titre non disponible'}</h3>
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : '/default-image.jpg'
                    }
                    alt={item.title || 'Image indisponible'}
                    className="list-item-poster"
                  />

                  <button onClick={() => handleRemove(item.id, 'favorites')}>
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Series Favorites */}
        <div className="list-section">
          <h2>Favoris - Séries</h2>
          {seriesFavorites.length === 0 ? (
            <p>Vous n'avez pas de séries dans vos Favoris.</p>
          ) : (
            <div className="list-items">
              {seriesFavorites.map((item) => (
                <div key={item.id} className="list-item">
                  <h3>{item.name || 'Titre non disponible'}</h3>
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : '/default-image.jpg'
                    }
                    alt={item.name || 'Image indisponible'}
                    className="list-item-poster"
                  />

                  <button onClick={() => handleRemove(item.id, 'favorites')}>
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ListsPage
