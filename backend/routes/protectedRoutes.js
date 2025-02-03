// Ce fichier définit des routes protégées, 
// c'est-à-dire des routes qui nécessitent une authentification préalable via un token JWT. 
// Il utilise le middleware authenticate pour vérifier que l'utilisateur est authentifié 
// avant de lui permettre d'accéder à certaines ressources 

const express = require("express");
const authenticate = require("../middleware/authenticate"); // Import du middleware
const router = express.Router();

// Route profile protégée
router.get("/profile", authenticate, (req, res) => {
  // Une fois authentifié, les informations de l'utilisateur sont disponibles dans req.user 
  res.json({ message: "Bienvenue dans votre profil", user: req.user });
});

module.exports = router;
