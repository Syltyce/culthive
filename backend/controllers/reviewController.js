// CRUD Avis
const User = require("../models/User");
const Review = require("../models/Review");

/**
 * Crée un avis sur une œuvre.
 * Vérifie si l'utilisateur existe avant de créer un avis.
 * @param {Object} req - Requête HTTP contenant les détails de l'avis.
 * @param {Object} res - Réponse HTTP retournant l'avis créé ou un message d'erreur.
 */
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

    // Récupérer la critique avec les informations de l'utilisateur
    const reviewWithUser = await Review.findByPk(newReview.id, {
      include: {
        model: User,
        attributes: ["username"], // On récupère uniquement le username
      },
    });

    res.status(201).json(reviewWithUser);
  } catch (error) {
    console.error("Erreur lors de la création de l'avis :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

/**
 * Récupère tous les avis associés à une œuvre spécifique.
 * @param {Object} req - Requête HTTP contenant l'ID de l'œuvre dans les paramètres.
 * @param {Object} res - Réponse HTTP retournant la liste des avis ou un message d'erreur.
 */
exports.getReviewsByWork = async (req, res) => {
  try {
    const { workId } = req.params;

    const reviews = await Review.findAll({
      where: { workId },
      include: [
        {
          model: User, // Jointure avec User
          attributes: ["id", "username"], // On ne récupère que le username
        },
      ],
    });

    res.json(reviews);
  } catch (error) {
    console.error("Erreur lors de la création de l'avis :", error);
    res.status(500).json({ error: error.message || "Erreur serveur." });
  }
};

/**
 * Met à jour un avis existant.
 * Vérifie si l'utilisateur est bien l'auteur de l'avis avant modification.
 * @param {Object} req - Requête HTTP contenant l'ID de l'avis et les nouveaux détails.
 * @param {Object} res - Réponse HTTP retournant l'avis mis à jour ou un message d'erreur.
 */
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { rating, title, comment } = req.body;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: "Avis non trouvé." });
    }

    // Vérifie que l'utilisateur connecté est bien celui qui a créé l'avis
    if (review.userId !== userId) {
      return res.status(403).json({ error: "Action non autorisée." });
    }

    await review.update({ rating, title, comment });

    // Recharger l'avis avec l'utilisateur associé
    const updatedReview = await Review.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["username"], // On récupère à nouveau le username
        },
      ],
    });

    res.json(updatedReview);
  } catch (error) {
    console.error("Erreur lors de la création de l'avis :", error);
    res.status(500).json({ error: error.message || "Erreur serveur." });
  }
};

/**
 * Supprime un avis existant.
 * Vérifie que l'utilisateur est bien l'auteur avant suppression.
 * @param {Object} req - Requête HTTP contenant l'ID de l'avis à supprimer.
 * @param {Object} res - Réponse HTTP confirmant la suppression ou renvoyant une erreur.
 */
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    console.log("User ID du token :", userId);

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: "Avis non trouvé." });
    }

    console.log("User ID de la critique trouvée :", review.userId);

    if (review.userId !== userId) {
      return res.status(403).json({ error: "Suppression non autorisée" });
    }

    await review.destroy();
    res.json({ message: "Avis supprimé." });
  } catch (error) {
    console.error("Erreur lors de la création de l'avis :", error);
    res.status(500).json({ error: error.message || "Erreur serveur." });
  }
};
