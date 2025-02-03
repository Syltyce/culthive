// Le fichier worksRoutes.js contient plusieurs routes API
// pour récupérer des informations sur des films et des séries populaires
// à partir de l'API TMDb (The Movie Database).
// Il utilise axios pour envoyer des requêtes HTTP à l'API,
// récupère les données et les retourne en réponse sous forme de JSON.
// Le fichier gère également les erreurs en cas de problème lors des requêtes à l'API.

// Importation des modules nécessaires
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();

const apiKey = process.env.TMDB_API_KEY; // La clé API pour accéder à l'API TMDb

// Route GET pour récupérer les films populaires
router.get("/movies", async (req, res) => {
  try {
    // Effectuer une requête GET à l'API TMDb pour récupérer les films populaires
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: apiKey, // Clé API pour s'authentifier auprès de TMDb
          language: "fr-FR", // Langue des résultats (français)
        },
      }
    );

    const movies = response.data.results; // Extraire la liste des films populaires
    res.json(movies); // Retourner les films populaires en JSON
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

// Route GET pour récupérer les séries populaires
router.get("/series", async (req, res) => {
  try {
    // Effectuer une requête GET à l'API TMDb pour récupérer les séries populaires
    const response = await axios.get(
      "https://api.themoviedb.org/3/tv/popular",
      {
        params: {
          api_key: apiKey, // Clé API pour s'authentifier auprès de TMDb
          language: "fr-FR", // Langue des résultats (français)
        },
      }
    );

    const series = response.data.results; // Extraire la liste des séries populaires
    res.json(series); // Retourner les séries populaires en JSON
  } catch (error) {
    console.error("Erreur lors de la récupération des séries :", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

// Route GET pour récupérer les détails d'un film spécifique
router.get("/movies/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: apiKey,
          language: "fr-FR",
        },
      }
    );

    // Retourner les détails du film en JSON
    const movie = response.data;
    res.json(movie);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du film : ",
      error
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des détails du film." });
  }
});

// Route GET pour récupérer les détails d'une série spécifique
router.get("/series/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
      params: {
        api_key: apiKey,
        language: "fr-FR",
      },
    });

    // Retourner les détails de la série en JSON
    const series = response.data;
    res.json(series);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de la série : ",
      error
    );
    res
      .status(500)
      .json({
        error: "Erreur lors de la récupération des détails de la série.",
      });
  }
});

module.exports = router;
