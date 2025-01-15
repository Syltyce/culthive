"use client"; // Marquer ce fichier comme un composant côté client

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importer useRouter
import "../styles/Header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const router = useRouter(); // Déclarer le hook useRouter

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Si un token est trouvé, récupérer les données de l'utilisateur (par exemple via l'API)
      fetch("http://localhost:3000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((err) => {
          console.error(
            "Erreur lors de la récupération des données utilisateur",
            err
          );
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Retirer le token à la déconnexion
    setUser(null); // Réinitialiser l'état de l'utilisateur
    router.push("/"); // Rediriger vers la page d'accueil après la déconnexion
  };

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
        <Link href="#members">Membres</Link>
      </nav>
      <div className="header-actions">
        <input type="text" className="search-bar" placeholder="Rechercher..." />
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
  );
};

export default Header;
