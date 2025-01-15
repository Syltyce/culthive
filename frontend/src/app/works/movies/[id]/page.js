"use client"; // Directive pour marquer ce fichier comme un composant client

import React, { useState, useEffect } from "react";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import "../../../../styles/WorkDetail.css";

function MovieDetail({ params: initialParams }) {
  const [params, setParams] = useState(null); // Stockage des paramètres résolus
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function resolveParams() {
      if (initialParams instanceof Promise) {
        const resolvedParams = await initialParams;
        setParams(resolvedParams);
      } else {
        setParams(initialParams);
      }
    }
    resolveParams();
  }, [initialParams]);

  useEffect(() => {
    async function fetchMovieDetails() {
      if (params?.id) {
        try {
          setLoading(true);
          const response = await fetch(
            `http://localhost:3000/api/works/movies/${params.id}`
          );
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
          setLoading(false);
        }
      }
    }
    fetchMovieDetails();
  }, [params]);

  if (!params) {
    return <div className="loading">Chargement des paramètres...</div>;
  }

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
        <p>Aucun détail disponible pour ce film.</p>
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

export default MovieDetail;
