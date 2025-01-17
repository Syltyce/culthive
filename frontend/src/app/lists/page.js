"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";
import "../../styles/ListsPage.css";

function ListsPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/users/login");
    } else {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken?.id;

      if (!userId) {
        setError("ID utilisateur manquant dans le token.");
        return;
      }

      const fetchUserLists = async () => {
        try {
          setLoading(true);

          // Récupère la watchlist
          const watchlistResponse = await fetch(
            `http://localhost:3000/api/list/list?userId=${userId}&type=watchlist`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!watchlistResponse.ok) {
            throw new Error("Erreur lors de la récupération de la Watchlist.");
          }

          const watchlistData = await watchlistResponse.json();

          // Récupère les détails des œuvres via le backend
          const watchlistDetails = await Promise.all(
            watchlistData.map(async (item) => {
              const workDetailsResponse = await fetch(
                `http://localhost:3000/api/list/details/${item.workId}`
              );

              if (!workDetailsResponse.ok) {
                throw new Error("Erreur lors de la récupération des détails des films.");
              }

              return workDetailsResponse.json();
            })
          );

          setWatchlist(watchlistDetails);

          // Récupère les favoris
          const favoritesResponse = await fetch(
            `http://localhost:3000/api/list/list?userId=${userId}&type=favorites`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!favoritesResponse.ok) {
            throw new Error("Erreur lors de la récupération des Favoris.");
          }

          const favoritesData = await favoritesResponse.json();

          const favoritesDetails = await Promise.all(
            favoritesData.map(async (item) => {
              const workDetailsResponse = await fetch(
                `http://localhost:3000/api/list/details/${item.workId}`
              );

              if (!workDetailsResponse.ok) {
                throw new Error("Erreur lors de la récupération des détails des films.");
              }

              return workDetailsResponse.json();
            })
          );

          setFavorites(favoritesDetails);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserLists();
    }
  }, [router]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading">Chargement des listes...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <p>{error}</p>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="lists-page">
        <h1>Mes Listes</h1>

        <div className="list-section">
          <h2>Watchlist</h2>
          {watchlist.length === 0 ? (
            <p>Vous n'avez pas d'œuvres dans votre Watchlist.</p>
          ) : (
            <div className="list-items">
              {watchlist.map((item) => (
                <div key={item.id} className="list-item">
                  <h3>{item.title || "Titre non disponible"}</h3>
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : "/default-image.jpg"
                    }
                    alt={item.title || "Image indisponible"}
                    className="list-item-poster"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="list-section">
          <h2>Favoris</h2>
          {favorites.length === 0 ? (
            <p>Vous n'avez pas d'œuvres dans vos Favoris.</p>
          ) : (
            <div className="list-items">
              {favorites.map((item) => (
                <div key={item.id} className="list-item">
                  <h3>{item.title || "Titre non disponible"}</h3>
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : "/default-image.jpg"
                    }
                    alt={item.title || "Image indisponible"}
                    className="list-item-poster"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ListsPage;
