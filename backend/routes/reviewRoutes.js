// Importation des modules nécessaires
const express = require("express");
const authenticate = require("../middleware/authenticate");
const Review = require("../models/Review");

const router = express.Router(); // Création d'une instance du routeur Express

// Route pour poster un avis sur une œuvre
router.post("/works/:workId/reviews", authenticate, async (req, res) => {
  try {
    // Extraction des données du corps de la requête (rating, title, comment)
    const { rating, title, comment } = req.body;
    // Extraction de l'ID de l'œuvre à partir des paramètres de la requête
    const { workId } = req.params;

    // Création d'un nouvel avis dans la base de données
    const review = await Review.create({
      userId: req.user.id,
      workId,
      rating,
      title,
      comment,
    });

    // Réponse en cas de succès avec l'objet review créé
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la review" });
  }
});

module.exports = router; // Exportation du routeur pour l'utiliser dans d'autres fichiers
