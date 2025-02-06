const express = require("express");
const authenticate = require("../middleware/authenticate");
const verifyAdmin = require("../middleware/verifyAdmin");

const Review = require("../models/Review"); // Import le model des reviews
const User = require("../models/User"); // Import le model des users

const router = express.Router();

// Route pour récupérer toutes les reviews postées par des utilisateurs
router.get("/reviews", authenticate, verifyAdmin, async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [{ model: User, attributes: ["id", "email"] }],
    });
    res.json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des reviews" });
  }
});

// Route pour supprimer une review
router.delete("/reviews/:id", authenticate, verifyAdmin, async (req, res) => {
  try {
    const reviewId = req.params.id;

    // Récupérer la review avant de le supprimer
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review introuvable" });
    }

    // Supprimer la review
    await review.destroy();

    res.json({
      message: "Review supprimé avec succès",
      deletedReview: review, // Retourne les infos de la review supprimé
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
});

// Route pour récupérer les utilisateurs du site 
router.get("/users", authenticate, verifyAdmin, async (req, res) => {
    try {
        const users = await User.findAll(); 
        res.json(users);
    } catch {
        res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
    }
})

// Route pour bannir un user
router.patch("/ban/:id", authenticate, verifyAdmin, async (req, res) => {
  try {
    const userId = req.params.id;

    // Trouver l'utilisateur dans la base de données
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mettre à jour le champ 'banned' pour bannir l'utilisateur
    await user.update({ banned: true });

    res.json({ message: "Utilisateur banni avec succès", user: user });
  } catch {}
});

module.exports = router;
