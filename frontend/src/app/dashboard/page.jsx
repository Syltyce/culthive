"use client"; 

import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useRouter } from "next/navigation";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Vérifier si l'utilisateur est authentifié
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/users/login"); // Si pas de token, rediriger vers la page de login
    } else {
      // Si un token est présent, récupérer les données de l'utilisateur (exemple avec un appel API)
      fetch("http://localhost:3000/api/user", {
        headers: {
          "Authorization": `Bearer ${token}`, // Ajoute le token dans le header
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => setUserData(data))
        .catch(err => {
          console.error("Erreur lors de la récupération des données utilisateur", err);
          setError("Une erreur est survenue lors du chargement des données.");
        });
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenue sur votre tableau de bord</h1>

        {error && <p className={styles.error}>{error}</p>}

        {userData ? (
          <div>
            <h2>Bonjour, {userData.username}</h2>
            <p>Email: {userData.email}</p>
            <p>Téléphone: {userData.phone}</p>
            {/* Autres informations utilisateur peuvent être affichées ici */}
          </div>
        ) : (
          <p>Chargement des données...</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
