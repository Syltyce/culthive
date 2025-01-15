const express = require('express');
const axios = require('axios');
require('dotenv').config();
const Work = require('../models/Work');  // Ton modèle Sequelize pour les œuvres
const router = express.Router();

// Récupération de la clé API depuis les variables d'environnement
const apiKey = process.env.TMDB_API_KEY;

// Route GET pour récupérer les films populaires
router.get('/movies', async (req, res) => {
  try {
    // Effectuer une requête GET à l'API TMDb pour récupérer les films populaires
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: apiKey, // Clé API pour s'authentifier auprès de TMDb
        language: 'fr-FR', // Langue des résultats (français)
      },
    });

    const movies = response.data.results;
    res.json(movies);  // Retourner les films populaires

  } catch (error) {
    console.error('Erreur lors de la récupération des films :', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
});

// Route GET pour récupérer les séries populaires
router.get('/series', async (req, res) => {
  try {
    // Effectuer une requête GET à l'API TMDb pour récupérer les séries populaires
    const response = await axios.get('https://api.themoviedb.org/3/tv/popular', {
      params: {
        api_key: apiKey, // Clé API pour s'authentifier auprès de TMDb
        language: 'fr-FR', // Langue des résultats (français)
      },
    });

    const series = response.data.results;
    res.json(series);  // Retourner les séries populaires

  } catch (error) {
    console.error('Erreur lors de la récupération des séries :', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
});

// Route GET pour récupérer les détails d'un film spécifique
router.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: apiKey,
        language: 'fr-FR',
      },
    });

    const movie = response.data;
    res.json(movie);  // Retourner les détails du film

  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film : ', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des détails du film.' });
  }
});

// Route GET pour récupérer les détails d'une série spécifique
router.get('/series/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
      params: {
        api_key: apiKey,
        language: 'fr-FR',
      },
    });

    const series = response.data;
    res.json(series);  // Retourner les détails de la série

  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la série : ', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des détails de la série.' });
  }
});

module.exports = router;
