const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const sequelize = require("./config/database");
const axios = require("axios");

// Import des routes d'authentification (register et login)
const authRoutes = require("./routes/authRoutes");

// Import du middleware d'identification
const authenticate = require("./middleware/authenticate");

// CORS pour autoriser les requêtes entre le frontend et le backend
const cors = require("cors");

// models
const Work = require("./models/Work");
const User = require("./models/User");
const Review = require("./models/Review");

const app = express();

// Permettre l'accès depuis le frontend (port 3001)
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json()); // Middleware pour parser le corps en JSON

// Ajout des routes d'authentification (routes définies dans le fichier 'authRoutes')
app.use("/api", authRoutes);

// Définition du port du serveur, soit celui dans le fichier .env ou 3000 par défaut
const PORT = process.env.PORT || 3000;

// Route de test
app.get("/", (req, res) => {
  res.send("Bienvenue sur le Backend de CultHive !");
});

// Partie Gestion Utilisateur
// Route pour récupérer tous les utilisateurs
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.findAll(); // Récupération de tous les utilisateurs dans la BDD
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
});

// Route pour ajouter un nouvel utilisateur
app.post("/api/users", async (req, res) => {
  try {
    const { username, email, password, telephone } = req.body; // Extraction des données de la requête
    const user = await User.create({ username, email, password, telephone }); // Création de l'utilisateur
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
  }
});

app.get('/api/user', authenticate, async (req, res) => {
  try {
    // `req.user` contient les données décodées du token (par ex. `id`, `username`, etc.)
    const user = await User.findOne({
      where: { id: req.user.id }, // Utiliser `req.user.id` pour identifier l'utilisateur
      attributes: ["id", "username", "email", "phone"], // Sélectionnez les colonnes que vous voulez retourner
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user); // Retourne les informations de l'utilisateur
  } catch (error) {
    console.error("Erreur lors de la récupération des données utilisateur :", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});


// Parties Films
// Route pour récupérer les films populaires depuis l'API TMDb
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
    res.json(movies); 
  } catch (error) {
    console.error("Erreur lors de la récupération des films:", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

// Parties Séries 
// Route pour récupérer les séries populaires depuis l'API TMDb
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
    res.json(series); 
  } catch (error) {
    console.error("Erreur lors de la récupération des films:", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

// Synchronisation de la base de données et démarrage du serveur
sequelize
  .sync() // Synchronisation avec la base de données (création des tables si elles n'existent pas)
  .then(() => {
    console.log("BDD synchronisée");
    app.listen(PORT, () => {
      console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Erreur de synchronisation de la BDD : `, error);
  });
