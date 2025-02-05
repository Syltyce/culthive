const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Requête vide" });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        query
      )}&api_key=${process.env.TMDB_API_KEY}&language=fr-FR`
    );
    const data = await response.json();
    res.status(200).json(data.results);
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
