const express = require("express");
const router = express.Router(); 
const authenticate = require('../middleware/authenticate')

const ReviewController = require("../controllers/reviewController");

// CRUD des avis
router.post("/", authenticate, ReviewController.createReview);
router.get("/:workId", ReviewController.getReviewsByWork);
router.put("/:id", authenticate, ReviewController.updateReview);
router.delete("/:id", authenticate, ReviewController.deleteReview);

module.exports = router;
