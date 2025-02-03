const express = require("express");

// Importations des différentes routes 
const authRoutes = require("./authRoutes");
const worksRoutes = require("./worksRoutes");
const listRoutes = require("./listRoutes");
const reviewRoutes = require("./reviewRoutes");

const router = express.Router(); // Création du routeur central avec Express

// Ajouter les routes dans le routeur central
router.use("/auth", authRoutes); // Authentification
router.use("/works", worksRoutes); // Gestion des œuvres
router.use('/list', listRoutes); // Gestion des listes 
router.use("/reviews", reviewRoutes) // Gestion des avis

module.exports = router; // Exportation du routeur pour qu'il puisse être utilisé dans l'application principale

