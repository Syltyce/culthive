'use client' // Marquer ce fichier comme un composant côté client

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // Importer useRouter
import '../styles/Header.css'

const Header = () => {

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  const [user, setUser] = useState(null)
  const router = useRouter() // Déclarer le hook useRouter

  // Variable pour la search bar
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Si un token est trouvé, récupérer les données de l'utilisateur (par exemple via l'API)
      fetch(`${API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((err) => {
          console.error(
            'Erreur lors de la récupération des données utilisateur',
            err
          )
        })
    }
  }, [])

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token') // Retirer le token à la déconnexion
    setUser(null) // Réinitialiser l'état de l'utilisateur
    router.push('/') // Rediriger vers la page d'accueil après la déconnexion
  }

  // Gérer la recherche
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `${API_URL}/api/search?query=${query}`
        )
        const data = await res.json()
        setResults(data)
      } catch (error) {
        console.error('Erreur lors de la recherche', error)
      }
      setLoading(false)
    }

    const timer = setTimeout(() => {
      fetchData()
    }, 300) // Débounce de 300ms

    return () => clearTimeout(timer)
  }, [query])

  return (
    <header className="header">
      <img
        className="header-logo"
        src="/logo_culthive_svg.svg"
        alt="Logo de CultHive"
      />

      <nav className="header-nav">
        <Link href="/">Accueil</Link>
        <Link href="/works/movies">Films</Link>
        <Link href="/works/series">Séries</Link>
        {/* <Link href="#members">Membres</Link> */}
        <Link href="/paiement">Faire un don</Link>
      </nav>

      {/* Barre de recherche */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Rechercher..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && <p className="loading-text">Chargement...</p>}
        {results.length > 0 && (
          <ul className="search-results">
            {results.slice(0, 6).map((item) => (
              <li key={item.id} className="search-item">
                <Link
                  href={
                    item.media_type === 'movie'
                      ? `/works/movies/${item.id}`
                      : `/works/series/${item.id}`
                  }
                  onClick={() => setQuery('')}
                >
                  {item.title || item.name} ({item.media_type})
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="header-actions">
        {/* Afficher les boutons de connexion/inscription si l'utilisateur n'est pas connecté */}
        {!user ? (
          <>
            <Link href="/users/login">
              <button className="btn login">Connexion</button>
            </Link>
            <Link href="/users/register">
              <button className="btn signup">Inscription</button>
            </Link>
          </>
        ) : (
          <>
            {/* Afficher le lien vers le profil et le bouton de déconnexion si l'utilisateur est connecté */}
            <Link href={`/dashboard`}>
              <button className="btn profile">Mon Profil</button>
            </Link>
            <button className="btn logout" onClick={handleLogout}>
              Déconnexion
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
