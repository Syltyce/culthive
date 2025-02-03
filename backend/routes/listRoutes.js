const express = require('express');
const router = express.Router();

const ListController = require('../controllers/listController');

// Définition des routes liées à la gestion des listes
router.post('/add', ListController.addToList);
router.post('/remove', ListController.removeFromList);
router.get('/list', ListController.getList); // Route pour récupérer une liste d'oeuvres
router.get('/lists', ListController.getUserLists); // Route pour récupérer toutes les listes d'oeuvres 
router.get('/details/:workId/:workType', ListController.getWorkDetails); // Route pour obtenir les détails d'une œuvre en particulier

module.exports = router;
