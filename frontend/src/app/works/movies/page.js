'use client';  // Directive indiquant que ce composant doit être côté client

import { useState, useEffect } from 'react';
import WorkCard from '../../../components/WorkCard';
import '../../../styles/MovieList.css'; // Import du CSS de la liste de films
import '../../../styles/Loading.css'; // Import du CSS de l'indicateur de chargement

function Movies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null); // Pour afficher l'erreur si nécessaire

  useEffect(() => {
    async function fetchMovies() {
      try {
        console.log('Fetching movies...');
        const response = await fetch("http://localhost:3000/api/works/movies"); // L'URL du backend
        console.log('Response:', response);

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des films");
        }

        const data = await response.json();
        console.log('Data:', data);
        setMovies(data);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message); // Stocke l'erreur pour l'afficher
      }
    }

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Films</h1>
      {error && <p>{error}</p>}  {/* Affiche l'erreur si elle existe */}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <WorkCard key={movie.id} work={movie} />
          ))
        ) : (
          <p>Aucun film trouvé</p>
        )}
      </div>
    </div>
  );
}

export default Movies;
