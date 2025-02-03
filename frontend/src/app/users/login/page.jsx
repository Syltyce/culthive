"use client";

import { useState, useEffect, useContext } from "react";

import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthContext from "@/components/AuthContext";

import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  // État pour les erreurs et les succès
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

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
        setSuccessMessage("");
        return;
      }

      const data = await response.json();
      console.log("Connexion réussie :", data);

      setIsAuthenticated(true); // Mettre à jour le contexte
      localStorage.setItem("token", data.token); // Mettre à jour le localStorage

      setSuccessMessage("Connexion Réussie !");
      setError(null);

    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard"); // Rediriger si authentifié
    }
  }, [isAuthenticated, router]);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Se connecter</h1>
        <p className={styles.subtitle}>Ça fait plaisir de vous voir</p>

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
            <span className={styles.highlight_2}>Mot de passe oublié ?</span>
          </Link>

          <button type="submit" className={styles.button}>
            Se connecter
          </button>
        </form>
        <Link href="/users/register" className={styles.link}>
          Pas encore de compte ?{" "}
          <span className={styles.highlight}>Inscrivez-vous</span>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
