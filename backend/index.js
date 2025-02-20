// Variables d'environnement
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const sequelize = require("./config/database");

// Import des routes pour les différentes fonctionnalités du backend
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const worksRoutes = require("./routes/worksRoutes");
const listRoutes = require("./routes/listRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const searchRoutes = require("./routes/searchRoutes");
const stripeRoutes = require("./routes/stripe");
const adminRoutes = require("./routes/adminRoutes");

// CORS pour autoriser les requêtes entre le frontend et le backend
const cors = require("cors");
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://culthive-frontend.vercel.app" || "http://localhost:3001";

// models nécessaires
const User = require("./models/User");
const List = require("./models/List");

// Définition des relations entre les modèles
List.belongsTo(User, { foreignKey: "userId" }); // Une liste appartient à un utilisateur
User.hasMany(List, { foreignKey: "userId" }); // Un utilisateur peut avoir plusieurs listes

const app = express(); // Création de l'instance Express

// Middleware CORS pour permettre l'accès depuis le frontend (port 3001)
app.use(
  cors({
    origin: ['http://localhost:3001', 'https://culthive-frontend.vercel.app'],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.options('*', cors());

app.use(express.json()); // Middleware pour parser le corps en JSON

// Enregistrement des différentes routes
app.use("/api", authRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/works", worksRoutes); 
app.use("/api/list", listRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/admin", adminRoutes);

// Définition du port du serveur, soit celui dans le fichier .env ou 3000 par défaut
const PORT = process.env.PORT || 3000;

// Route de test
app.get("/", (req, res) => {
  res.send("Bienvenue sur le Backend de CultHive !");
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
