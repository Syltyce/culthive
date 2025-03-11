'use client' // Directive indiquant que ce composant doit être côté client

import { useState, useEffect } from 'react'
import WorkCardSerie from '../../../components/WorkCardSerie'
import Header from '../../../components/Header'
import Footer from '@/components/Footer'
import '../../../styles/MovieList.css' // Import du CSS de la liste de films
import '../../../styles/Loading.css' // Import du CSS de l'indicateur de chargement

function Series() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const [series, setSeries] = useState([])
  const [error, setError] = useState(null) // Pour afficher l'erreur si nécessaire

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchSeries() {
      try {
        console.log(`Fetching series from page ${currentPage}...`)
        const response = await fetch(
          `${API_URL}/api/works/series?page=${currentPage}`
        ) // L'URL du backend
        console.log('Response:', response)

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des séries')
        }

        const data = await response.json()
        console.log('Data:', data)

        setSeries(data.series)
        setTotalPages(data.total_pages) // Mettre à jour le nombre total de pages

      } catch (err) {
        console.error('Error:', err)
        setError(err.message) // Stocke l'erreur pour l'afficher
      }
    }

    fetchSeries()
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
      <h1>Séries</h1>
      {error && <p>{error}</p>} {/* Affiche l'erreur si elle existe */}
      <div className="movie-list">
        {series.length > 0 ? (
          series.map((serie) => <WorkCardSerie key={serie.id} work={serie} />)
        ) : (
          <p>Aucune série trouvée</p>
        )}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Précédent
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Series
