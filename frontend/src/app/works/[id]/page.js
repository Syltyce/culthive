// src/app/works/[id]/page.js
"use client";

import React, { use, useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import "../../../styles/WorkDetail.css";

function WorkDetail({ params }) {
  const { id } = use(params); // Utilise React.use() pour déballer 'params'
  const [movie, setMovie] = useState(null); // Stocke les détails de l'œuvre
  const [error, setError] = useState(null); // Pour gérer les erreurs
  const [loading, setLoading] = useState(true); // Indique si les données sont en cours de chargement

  useEffect(() => {
    async function fetchWorkDetails() {
      try {
        const response = await fetch(`http://localhost:3000/api/works/${id}`); // Appelle ton backend
        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des détails du film."
          );
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Fin du chargement
      }
    }

    fetchWorkDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Chargement...</div>;
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

  if (!movie) {
    return (
      <div>
        <Header />
        <p>Aucun détail disponible pour cette œuvre.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="work-detail">
        <h1>{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="work-poster"
        />
        <p>
          <strong>Synopsis :</strong> {movie.overview}
        </p>
        <p>
          <strong>Date de sortie :</strong> {movie.release_date}
        </p>
        <p>
          <strong>Note moyenne :</strong> {movie.vote_average} / 10
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default WorkDetail;
