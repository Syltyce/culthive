const express = require("express");
const router = express.Router();

const ReviewController = require("../controllers/reviewController");

// CRUD des avis
router.post("/", ReviewController.createReview);
router.get("/:workId", ReviewController.getReviewsByWork);
router.put("/:id", ReviewController.updateReview);
router.delete("/:id", ReviewController.deleteReview);

module.exports = router;
