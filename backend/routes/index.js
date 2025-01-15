const express = require("express");
const authRoutes = require("./authRoutes"); // Déjà existant
const worksRoutes = require("./works");    // Déjà existant

const router = express.Router();

// Ajouter les routes dans le routeur central
router.use("/auth", authRoutes);   // Authentification
router.use("/works", worksRoutes); // Gestion des œuvres

module.exports = router;
