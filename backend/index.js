const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const sequelize = require("./config/database");
const axios = require("axios");

const authRoutes = require('./routes/authRoutes');  // Import des routes


const cors = require("cors");

// models
const Work = require("./models/Work");
const User = require("./models/User");
const Review = require("./models/Review");

const app = express();

// Permettre l'accès depuis le frontend (port 3001)
app.use(
  cors({
    origin: "http://localhost:3001", // Remplace par l'URL de ton frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use(express.json());  // Middleware pour parser le corps en JSON

app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;

// Route de test
app.get("/", (req, res) => {
  res.send("Bienvenue sur le Backend de CultHive !");
});

// Partie Gestion Utilisateur
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { username, email, password, telephone } = req.body;
    const user = await User.create({ username, email, password, telephone });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
  }
});

// Parties Films
app.get("/api/works/movies", async (req, res) => {
  try {
    const apiKey = process.env.TMDB_API_KEY;

    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: apiKey,
          language: "fr-FR", // Langue des résultats
        },
      }
    );

    // Les films récupérés depuis l'API
    const movies = response.data.results;
    res.json(movies); // Envoi des films au frontend
  } catch (error) {
    console.error("Erreur lors de la récupération des films:", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

// Parties Films
app.get("/api/works/series", async (req, res) => {
  try {
    const apiKey = process.env.TMDB_API_KEY;

    const response = await axios.get(
      "https://api.themoviedb.org/3/tv/popular",
      {
        params: {
          api_key: apiKey,
          language: "fr-FR", // Langue des résultats
        },
      }
    );

    // Les séries récupérés depuis l'API
    const series = response.data.results;
    res.json(series); // Envoi des films au frontend
  } catch (error) {
    console.error("Erreur lors de la récupération des films:", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

sequelize
  .sync()
  .then(() => {
    console.log("BDD synchronisée");
    app.listen(PORT, () => {
      console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Erreur de synchronisation de la BDD : `, error);
  });
