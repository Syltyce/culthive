const express = require("express");
const authenticate = require("../middleware/authenticate");
const Review = require("../models/Review");

const router = express.Router();

router.post("/works/:workId/reviews", authenticate, async (req, res) => {
  try {
    const { rating, title, comment } = req.body;
    const { workId } = req.params;

    const review = await Review.create({
      userId: req.user.id,
      workId,
      rating,
      title,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la review" });
  }
});

module.exports = router;
