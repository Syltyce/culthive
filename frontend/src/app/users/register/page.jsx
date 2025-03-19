// "use client" indique que ce fichier utilise React côté client (frontend), ce qui permet l'interactivité.
'use client'

// Importations des components
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'

// Diverses Importations
import Link from 'next/link'
import styles from './Register.module.css'
import { useState } from 'react'

// Composant fonctionnel Register qui représente la page d'inscription
export default function Register() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL 

  // Déclaration des états pour gérer les différents champs du formulaire
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')

  // État pour afficher les erreurs et les succès
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('') // État pour les succès

  // Fonction Asynchrone appelée lorsqu'on soumet le formulaire pour s'inscrire
  const register = async () => {
    // Envoie d'une requête POST à l'API /api/register avec les données du formulaire
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Envoie des données en JSON (username, mail, mdp, téléphone)
      body: JSON.stringify({
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      }),
    })

    // Si la réponse du backend n'est pas OK : on affiche l'erreur
    if (!response.ok) {
      const errorData = await response.json()
      setErrorMessage(errorData.message) // Affiche le message d'erreur côté frontend
      setSuccessMessage('') // Réinitialiser le message de succès
      console.error('Erreur backend :', errorData.message)
      return
    }

    // Si tout va bien, on récupère les données renvoyées par le serveur
    const data = await response.json()
    if (response.ok) {
      console.log('Inscription réussie :', data)
      setSuccessMessage(
        'Inscription réussie ! Vous pouvez vous connecter désormais !'
      )
      setErrorMessage('') // Efface les messages d'erreur en cas de succès
    } else {
      console.error('Erreur :', data.message)
      setErrorMessage(
        "Une erreur inattendue s'est produite. Veuillez réessayer."
      )
      setSuccessMessage('') // Réinitialiser le message de succès
    }
  }

  // Rendu HTML du composant
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Créer un compte</h1>
        <p className={styles.subtitle}>
          Rejoignez-nous et découvrez de nouvelles œuvres passionnantes.
        </p>

        {/* Affichage du message d'erreur ou de la réussite de l'inscription  */}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        {/* Formulaire d'inscription qui enregistre les différents champs dans les useState grâce à onChange */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            register()
          }}
          className={styles.form}
        >
          <input
            className={styles.input}
            type="text"
            placeholder="Votre nom d'utilisateur"
            name="username"
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Mot de passe"
            name="password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <button type="submit" className={styles.button}>
            S'inscrire
          </button>
        </form>

        <Link href="/users/login" className={styles.link}>
          Vous avez déjà un compte ?{' '}
          <span className={styles.highlight}>Je me connecte</span>
        </Link>
      </main>
      <Footer />
    </div>
  )
}
