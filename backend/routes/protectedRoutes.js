// backend/routes/protectedRoutes.js

const express = require("express");
const authenticate = require("../middleware/authenticate"); // Import du middleware
const router = express.Router();

// Exemple de route protégée
router.get("/profile", authenticate, (req, res) => {
  res.json({ message: "Bienvenue dans votre profil", user: req.user });
});

module.exports = router;
