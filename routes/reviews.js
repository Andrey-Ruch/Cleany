const express = require("express");
const router = express.Router();
const {
  validatePostId,
  validateReviewId,
  validateReviewInput,
} = require("../middleware/validation");
const {
  getAllReviews,
  createReview,
  deleteReview,
} = require("../controllers/reviews");

router
  .route("/:postId")
  .get(getAllReviews)
  .post(validatePostId, validateReviewInput, createReview);
router.route("/:id").delete(validateReviewId, deleteReview);

module.exports = router;
