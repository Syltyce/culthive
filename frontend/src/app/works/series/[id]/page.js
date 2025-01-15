"use client"; // Directive pour marquer ce fichier comme un composant client

import React, { useState, useEffect } from "react";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import "../../../../styles/WorkDetail.css";

function SeriesDetail({ params: initialParams }) {
  const [params, setParams] = useState(null); // Stockage des paramètres résolus
  const [series, setSeries] = useState(null);
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
    async function fetchSeriesDetails() {
      if (params?.id) {
        try {
          setLoading(true);
          const response = await fetch(
            `http://localhost:3000/api/works/series/${params.id}`
          );
          if (!response.ok) {
            throw new Error(
              "Erreur lors de la récupération des détails de la série."
            );
          }
          const data = await response.json();
          setSeries(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchSeriesDetails();
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

  if (!series) {
    return (
      <div>
        <Header />
        <p>Aucun détail disponible pour cette série.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="work-detail">
        <h1>{series.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
          alt={series.title}
          className="work-poster"
        />
        <p>
          <strong>Synopsis :</strong> {series.overview}
        </p>
        <p>
          <strong>Date de première diffusion :</strong> {series.first_air_date}
        </p>
        <p>
          <strong>Note moyenne :</strong> {series.vote_average} / 10
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default SeriesDetail;
