'use client'

import { useState, useEffect } from 'react'
import WorkCardMovie from '@/components/WorkCardMovie'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '../../../styles/MovieList.css' // Import du CSS de la liste de films
import '../../../styles/Loading.css' // Import du CSS de l'indicateur de chargement

function Movies() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null) // Pour afficher l'erreur si nécessaire

  const [currentPage, setCurrentPage] = useState(1) // Page actuelle
  const [totalPages, setTotalPages] = useState(1) // Total des pages

  useEffect(() => {
    async function fetchMovies() {
      try {
        console.log(`Fetching movies from page ${currentPage}...`)
        const response = await fetch(
          `${API_URL}/api/works/movies?page=${currentPage}`
        ) // L'URL du backend
        console.log('Response:', response)

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des films')
        }

        const data = await response.json()
        console.log('Data:', data)

        setMovies(data.movies)
        setTotalPages(data.total_pages) // Mettre à jour le nombre total de pages
      } catch (err) {
        console.error('Error:', err)
        setError(err.message) // Stocke l'erreur pour l'afficher
      }
    }

    fetchMovies()
  }, [currentPage])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  return (
    <div>
      <Header />
      <h1>Films</h1>
      {error && <p>{error}</p>} {/* Affiche l'erreur si elle existe */}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => <WorkCardMovie key={movie.id} work={movie} />)
        ) : (
          <p>Aucun film trouvé</p>
        )}
      </div>
      {/* Boutons de pagination */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Précédent
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Suivant
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Movies
