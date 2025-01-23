const express = require("express");
const authRoutes = require("./authRoutes"); // Déjà existant
const worksRoutes = require("./worksRoutes");    // Déjà existant
const listRoutes = require("./listRoutes")
const reviewRoutes = require("./reviewRoutes")

const router = express.Router();

// Ajouter les routes dans le routeur central
router.use("/auth", authRoutes);   // Authentification
router.use("/works", worksRoutes); // Gestion des œuvres
router.use('/list', listRoutes); // Gestion des listes 
router.use("/reviews", reviewRoutes)


module.exports = router;
