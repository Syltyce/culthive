// backend/importWorks.js
const dotenv = require("dotenv");
dotenv.config();

const axios = require("axios");
const Work = require("./models/Work"); // Import du modèle Work pour insérer dans la BDD

const apiKey = process.env.TMDB_API_KEY;

// Fonction pour récupérer les œuvres et les insérer dans la base de données
async function fetchAndSaveWorks() {
  try {
    // Remplace l'URL de l'API externe par l'URL de l'API que tu veux utiliser
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: apiKey, // La clé API est passée dans les paramètres
          language: "fr-FR", // Optionnel : langue des résultats
        },
      }
    );

    const works = response.data.results; // Supposons que la réponse contient une liste d'œuvres sous `results`

    for (let work of works) {
      // Vérifie si l'œuvre existe déjà dans la base de données
      await Work.findOrCreate({
        where: { external_id: work.id },
        defaults: {
          title: work.title,
          description: work.overview,
          image_url: `https://image.tmdb.org/t/p/w500${work.poster_path}`, // Utilisation de l'image de l'API
          type: "movie", // Ou 'tv' si c'est une série, par exemple
        },
      });
    }

    console.log("Œuvres importées avec succès!");
  } catch (error) {
    console.error("Erreur lors de l'importation des œuvres :", error);
  }
}

// Exécuter la fonction d'importation
fetchAndSaveWorks();
