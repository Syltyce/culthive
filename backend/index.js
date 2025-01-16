const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const sequelize = require("./config/database");
const axios = require("axios");

// Import des routes d'authentification (register et login)
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); // Import des routes pour les films et séries
const worksRoutes = require("./routes/worksRoutes"); // Import des routes pour les films et séries

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

app.use("/api/users", userRoutes); // Préfixe les routes des utilisateurs
app.use("/api/works", worksRoutes);  // Préfixe les routes des films et séries avec /api/works


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
