// backend/routes/works.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();
const Work = require('../models/Work');  // Ton modèle Sequelize pour les œuvres
const router = express.Router();

// Récupération de la clé API depuis les variables d'environnement
const apiKey = process.env.TMDB_API_KEY;

// Route GET pour récupérer les œuvres populaires
router.get('/works', async (req, res) => {
  try {
    // Effectuer une requête GET à l'API TMDb pour récupérer les œuvres populaires
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: apiKey, // Clé API pour s'authentifier auprès de TMDb
        language: 'fr-FR', // Langue des résultats (français)
      },
    });

    // Récupère les œuvres populaires
    const works = response.data.results;
    res.json(works);

  } catch (error) {
    // Si les œuvres n'ont pas été bien récupéré : erreur 
    console.error('Erreur lors de la récupération des œuvres:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
});

module.exports = router;
