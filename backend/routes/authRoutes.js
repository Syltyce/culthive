// Ce fichier contient deux routes pour l'authentification des utilisateurs :
// une pour l'inscription (/register) et une pour la connexion (/login).
// Il gère la création d'un nouvel utilisateur, la validation des entrées,
// le hachage des mots de passe avec bcrypt,
// et la génération de tokens JWT pour les utilisateurs authentifiés.

// Variables d'environnement
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/User"); // Modèle User

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs"); // Module de hashage des mdp
const jwt = require("jsonwebtoken"); // Module pour manipuler les tokens JWT

// Route d'inscription (register)
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body; // Extraction des données du corps de la requête

  // Envoie un message s'il manque l'un des 3 champs obligatoire du formulaire
  if (!username || !email || !password) {
    return res.status(400).json({
      code: "FIELDS_MISSING",
      message: "Tous les champs obligatoires ne sont pas remplis.",
    });
  }

  // Vérification format email
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.status(400).json({
      code: "EMAIL_INVALID",
      message: "L'email est invalide.",
    });
  }

  // Vérification format mdp
  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/\d/.test(password)
  ) {
    return res.status(400).json({
      code: "PASSWORD_WEAK",
      message:
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
    });
  }

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        code: "EMAIL_ALREADY_USED",
        message: "Cet email est déjà utilisé.",
      });
    }

    // Hache le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Réponse de succès avec les informations de l'utilisateur (sans le mot de passe)
    res.status(201).json({
      message: "Inscription réussie",
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.error("Erreur dans /register :", error.message, error.stack);
    res.status(500).json({ message: "Erreur serveur" });

    // Gestion des erreurs de validation Sequelize
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Validation error",
        details: error.errors.map((e) => e.message), // Détail des erreurs de validation
      });
    }
  }
});

// Route de connexion (login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Vérification que l'email et le mot de passe sont renseignés
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email et mot de passe sont obligatoires." });
  }

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email ou Mot de Passe incorrect." });
    }

    // Vérifier si l'utilisateur est banni
    if (user.banned) {
      return res.status(403).json({ message: "Votre compte a été banni." });
    }

    // Comparer le mot de passe avec celui haché en BDD
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ message: "Email ou Mot de Passe incorrect." });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Répondre avec le token JWT
    res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router; // Exposer le routeur pour l'utiliser dans l'application
