"use client"; // Directive indiquant que ce composant doit être côté client

import { useState, useEffect } from "react";
import WorkCard from "../../../components/WorkCard";
import Header from '../../../components/Header';
import Footer from '@/components/Footer';
import "../../../styles/MovieList.css"; // Import du CSS de la liste de films
import "../../../styles/Loading.css"; // Import du CSS de l'indicateur de chargement

function Series() {
  const [series, setSeries] = useState([]);
  const [error, setError] = useState(null); // Pour afficher l'erreur si nécessaire

  useEffect(() => {
    async function fetchSeries() {
      try {
        console.log("Fetching series...");
        const response = await fetch("http://localhost:3000/api/works/series"); // L'URL du backend
        console.log("Response:", response);

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des films");
        }

        const data = await response.json();
        console.log("Data:", data);
        setSeries(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message); // Stocke l'erreur pour l'afficher
      }
    }

    fetchSeries();
  }, []);

  return (
    <div>
      <Header />
      <h1>Séries</h1>
      {error && <p>{error}</p>} {/* Affiche l'erreur si elle existe */}
      <div className="movie-list">
        {series.length > 0 ? (
          series.map((movie) => <WorkCard key={movie.id} work={movie} />)
        ) : (
          <p>Aucun film trouvé</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Series;
