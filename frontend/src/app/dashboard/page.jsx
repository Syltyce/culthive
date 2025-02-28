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
      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenue sur votre tableau de bord</h1>

        {error && <p className={styles.error}>{error}</p>}

        {userData ? (
          <div>
            <h2 className={styles.titleUser}>
              Bonjour {userData.username}, bienvenue sur votre profil CultHive
            </h2>

            {/* Menu de navigation avec un lien vers la liste */}
            <nav className={styles.navDashboard}>
              <ul>
                <li>
                  <Link href="/lists">
                    <button className={styles.btn}> Voir mes listes </button>
                  </Link>
                </li>
                {/* Ajouter d'autres liens si nécessaire */}
              </ul>
            </nav>
          </div>
        ) : (
          <p>Chargement des données...</p>
        )}
      </main>
      <Footer />
    </div>
  )
}
