// Ce fichier définit plusieurs routes pour la gestion des utilisateurs,
// y compris la récupération de tous les utilisateurs,
// l'ajout d'un utilisateur et la récupération du profil d'un utilisateur authentifié.
// Le middleware authenticate est utilisé pour protéger la route de récupération du profil,
// assurant que seules les personnes authentifiées peuvent y accéder.

// Importation des modules nécessaires
const express = require("express");
const User = require("../models/User");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

// Partie Gestion Utilisateur
// Route pour récupérer tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll(); // Récupération de tous les utilisateurs dans la BDD
    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error); 
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
});

// Route pour ajouter un nouvel utilisateur
router.post("/", async (req, res) => {
  try {
    const { username, email, password, telephone } = req.body; // Extraction des données de la requête
    const user = await User.create({ username, email, password, telephone }); // Création de l'utilisateur
    res.status(201).json(user);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", error); 
    res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
  }
});

// Route pour récupérer le profil de l'utilisateur connecté (accessible uniquement après authentification)
router.get("/profile", authenticate, async (req, res) => {
  try {
    // `req.user` contient les données décodées du token (par ex. `id`, `username`, etc.)
    const user = await User.findOne({
      where: { id: req.user.id }, // Utiliser `req.user.id` pour identifier l'utilisateur
      attributes: ["id", "username", "email"], // Sélectionnez les colonnes que vous voulez retourner
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user); // Retourne les informations de l'utilisateur
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données utilisateur :",
      error
    );
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

module.exports = router;
