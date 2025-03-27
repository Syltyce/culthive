'use client'

import { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      alert('Vous devez être connecté pour supprimer votre compte.')
      return
    }

    const confirmDelete = window.confirm(
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'
    )

    if (!confirmDelete) return

    try {
      const response = await fetch(`${API_URL}/api/users/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Erreur: ${response.status}`)
      }

      // Suppression réussie, on efface les données locales et on redirige vers la page de login
      localStorage.removeItem('token')
      router.push('/users/login')
    } catch (err) {
      console.error('Erreur lors de la suppression du compte', err)
      alert('Une erreur est survenue lors de la suppression du compte.')
    }
  }

  // Vérifier si l'utilisateur est authentifié
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/users/login') // Si pas de token, rediriger vers la page de login
    } else {
      // Si un token est présent, récupérer les données de l'utilisateur (exemple avec un appel API)
      fetch(`${API_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajoute le token dans le header
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.json()
        })
        .then((data) => setUserData(data))
        .catch((err) => {
          console.error(
            'Erreur lors de la récupération des données utilisateur',
            err
          )
          setError('Une erreur est survenue lors du chargement des données.')
        })
    }
  }, [router])

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.containerDashboard}>
        <h1 className={styles.title}>Bienvenue sur votre tableau de bord</h1>

        {error && <p className={styles.error}>{error}</p>}

        {userData ? (
          <div>
            <h2 className={styles.titleUser}>
              Bonjour {userData.username}, bienvenue sur votre profil CultHive
            </h2>

            <Link href="/lists">
              <button className={styles.btn}> Voir mes listes </button>
            </Link>
          </div>
        ) : (
          <p>Chargement des données...</p>
        )}

        <button onClick={handleDeleteAccount} className={styles.btnDelete}>
          Supprimer mon compte
        </button>
      </div>
      <Footer />
    </div>
  )
}
