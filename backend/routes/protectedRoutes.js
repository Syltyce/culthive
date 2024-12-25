// backend/routes/protectedRoutes.js

const express = require("express");
const authenticate = require("../middleware/authenticate"); // Import du middleware
const router = express.Router();

// Exemple de route protégée
router.get("/profile", authenticate, (req, res) => {
  // Une fois authentifié, les informations de l'utilisateur sont disponibles dans req.user 
  res.json({ message: "Bienvenue dans votre profil", user: req.user });
});

module.exports = router;
