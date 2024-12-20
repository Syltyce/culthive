// backend/routes/works.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();
const Work = require('../models/Work');  // Ton modèle Sequelize pour les œuvres
const router = express.Router();

const apiKey = process.env.TMDB_API_KEY;

router.get('/works', async (req, res) => {
  try {
    // Exemple de récupération des œuvres populaires depuis l'API TMDb
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: apiKey,
        language: 'fr-FR', // Langue des résultats
      },
    });

    // Retourner les œuvres récupérées
    const works = response.data.results;
    res.json(works);
  } catch (error) {
    console.error('Erreur lors de la récupération des œuvres:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
});

module.exports = router;
