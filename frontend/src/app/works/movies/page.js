'use client'; 

import { useState, useEffect } from 'react';
import WorkCardMovie from '@/components/WorkCardMovie';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
        console.log("First movie:", data[0]); // Afficher le premier objet movie pour vérifier sa structure

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
      <Header />
      <h1>Films</h1>
      {error && <p>{error}</p>}  {/* Affiche l'erreur si elle existe */}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <WorkCardMovie key={movie.id} work={movie} />
          ))
        ) : (
          <p>Aucun film trouvé</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Movies;