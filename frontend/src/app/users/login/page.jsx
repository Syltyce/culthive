// "use client" indique que ce fichier utilise React côté client (frontend), ce qui permet l'interactivité.
"use client";

import { useState, useEffect } from "react";

import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // État pour les erreurs et les succès
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nouvelle variable d'état pour vérifier la connexion
  const router = useRouter();

  // Fonction de gestion de la connexion
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        setSuccessMessage(""); // Réinitialiser le message de succès
        return;
      }

      const data = await response.json();
      console.log("Connexion réussie :", data);
      setSuccessMessage("Connexion Réussie !");
      setError(null); // Réinitialiser l'erreur
      setIsLoggedIn(true); // Marquer l'utilisateur comme connecté

      // Sauvegarder le token JWT localement
      localStorage.setItem("token", data.token);

      // Redirection ou action après connexion
      // window.location.href = "/dashboard"; // Exemple de redirection
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
      setSuccessMessage("Vous êtes connecté !"); // Réinitialiser le message de succès
    }
  };

  // Utiliser useEffect pour gérer la redirection après la connexion
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard"); // Rediriger vers le tableau de bord
    }
  }, [isLoggedIn, router]); // Assurez-vous que l'effet se déclenche lorsque isLoggedIn change

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}> Se connecter</h1>
        <p className={styles.subtitle}>Ca fait plaisir de vous voir</p>

        {successMessage && <p className={styles.success}>{successMessage}</p>}
        {error && <p className={styles.error}>{error}</p>}

        <form className={styles.form} onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nom d'utilisateur ou email"
            name="username"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link href="#" className={styles.link}>
            <span className={styles.highlight_2}> Mot de passe oublié ? </span>
          </Link>

          <button type="submit" className={styles.button}>
            Se connecter
          </button>
        </form>
        <Link href="/users/register" className={styles.link}>
          Pas encore de compte ?{" "}
          <span className={styles.highlight}>Inscrivez-vous</span>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
