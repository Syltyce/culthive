const express = require('express');
const router = express.Router();
const ListController = require('../controllers/listController');

router.post('/add', ListController.addToList);
router.post('/remove', ListController.removeFromList);
router.get('/list', ListController.getList);
router.get('/lists', ListController.getUserLists);

module.exports = router;
