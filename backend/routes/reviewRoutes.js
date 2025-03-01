const express = require("express");
const router = express.Router(); 
const authenticate = require('../middleware/authenticate')

const ReviewController = require("../controllers/reviewController");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Gestion des avis sur les œuvres.
 * 
 * /api/reviews:
 *   post:
 *     summary: Ajouter un avis
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workId:
 *                 type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Avis ajouté avec succès.
 *       401:
 *         description: Non autorisé.
 *       500:
 *         description: Erreur serveur.
 * 
 * /api/reviews/{workId}:
 *   get:
 *     summary: Récupérer les avis d'une œuvre
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: workId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'œuvre.
 *     responses:
 *       200:
 *         description: Succès - Retourne les avis.
 *       500:
 *         description: Erreur serveur.
 * 
 * /api/reviews/{id}:
 *   put:
 *     summary: Modifier un avis
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'avis.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Avis modifié.
 *       401:
 *         description: Non autorisé.
 *       500:
 *         description: Erreur serveur.
 * 
 *   delete:
 *     summary: Supprimer un avis
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'avis.
 *     responses:
 *       200:
 *         description: Avis supprimé.
 *       401:
 *         description: Non autorisé.
 *       500:
 *         description: Erreur serveur.
 */


// CRUD des avis
router.post("/", authenticate, ReviewController.createReview);
router.get("/:workId", ReviewController.getReviewsByWork);
router.put("/:id", authenticate, ReviewController.updateReview);
router.delete("/:id", authenticate, ReviewController.deleteReview);

module.exports = router;
