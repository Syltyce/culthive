// backend/routes/authRoutes.js

const express = require("express");
const bcrypt = require('bcrypt');
const User = require("../models/User");
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


// Route d'inscription (register)
router.post("/register", async (req, res) => {
  const { username, email, password, phone } = req.body;

  // Vérifications de base
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Tous les champs obligatoires ne sont pas remplis." });
  }

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.status(400).json({ message: "L'email est invalide." });
  }

  if (phone && !/^0\d{9}$/.test(phone)) {
    return res.status(400).json({ message: "Le numéro de téléphone est invalide." });
  }

  if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
    return res.status(400).json({
      message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
    });
  }

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const newUser = await User.create({ username, email, password: hashedPassword, phone });
    res.status(201).json({ message: "Inscription réussie", user: { username: newUser.username, email: newUser.email } });
  } catch (error) {
    console.error("Erreur dans /register :", error.message, error.stack);
    res.status(500).json({ message: "Erreur serveur" });

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        details: error.errors.map(e => e.message),
      });
    }

  }
});

// Route de connexion (login)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe sont obligatoires." });
    }
  
    try {
      // Vérifier si l'utilisateur existe
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Email ou mot de passe incorrect." });
      }
  
      // Comparer le mot de passe avec celui haché en base
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "Email ou mot de passe incorrect." });
      }
  
      // Générer un token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ message: "Connexion réussie", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  

module.exports = router;
