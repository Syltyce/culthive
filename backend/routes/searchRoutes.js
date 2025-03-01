// Importer Axios au lieu de fetch
const axios = require("axios");
const express = require("express");
require("dotenv").config();

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Recherche de films, séries et personnes via TMDb.
 * 
 * /api/search:
 *   get:
 *     summary: Recherche globale
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Terme de recherche.
 *     responses:
 *       200:
 *         description: Succès - Retourne les résultats de la recherche.
 *       400:
 *         description: Erreur - Requête vide.
 *       500:
 *         description: Erreur serveur.
 */


router.get("/", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Requête vide" });
  }

  try {
    // Utiliser Axios pour effectuer la requête
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        query
      )}&api_key=${process.env.TMDB_API_KEY}&language=fr-FR`
    );

    // Renvoie les résultats de la réponse d'Axios
    res.status(200).json(response.data.results);
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
