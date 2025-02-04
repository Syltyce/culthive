// CRUD Avis
const User = require("../models/User");
const Review = require("../models/Review");

// Créer un avis
exports.createReview = async (req, res) => {
  try {
    const userId = req.user.id; // On récupère l'ID de l'utilisateur à partir du token décodé
    const { workId, rating, title, comment } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    if (!userId || !workId || !rating) {
      return res.status(400).json({ error: "Champs obligatoires manquants." });
    }

    const newReview = await Review.create({
      userId,
      workId,
      rating,
      title,
      comment,
    });
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Erreur lors de la création de l'avis :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// Récupérer les avis d'une œuvre spécifique
exports.getReviewsByWork = async (req, res) => {
  try {
    const { workId } = req.params;
    const reviews = await Review.findAll({ where: { workId } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// Modifier un avis
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, title, comment } = req.body;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: "Avis non trouvé." });
    }

    await review.update({ rating, title, comment });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// Supprimer un avis
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: "Avis non trouvé." });
    }

    await review.destroy();
    res.json({ message: "Avis supprimé." });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur." });
  }
};
