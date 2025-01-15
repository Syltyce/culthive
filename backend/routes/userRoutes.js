const express = require("express");
const User = require("../models/User");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

// Route pour récupérer tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
});

// Route pour ajouter un nouvel utilisateur
router.post("/", async (req, res) => {
  try {
    const { username, email, password, telephone } = req.body;
    const user = await User.create({ username, email, password, telephone });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
  }
});

// Route pour récupérer un utilisateur
router.get('/user', authenticate, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "username", "email", "phone"],
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération des données utilisateur :", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

module.exports = router;
