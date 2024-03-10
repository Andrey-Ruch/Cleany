const express = require("express");
const router = express.Router();
const { authorizePermissions } = require("../middleware/authentication");
const {
  validateEmploymentInput,
  validateEmploymentQuery,
  validateEmploymentId,
} = require("../middleware/validation");
const {
  getAllUserEmployments,
  createEmployments,
  getSenderEmployments,
  updateEmployment,
  deleteEmployment,
} = require("../controllers/employments");

// Apply authorization middleware to all routes
router.use(authorizePermissions("Employer", "Employee"));

router
  .route("/")
  .post(validateEmploymentInput, createEmployments)
  .get(getAllUserEmployments);
router.route("/sender").get(validateEmploymentQuery, getSenderEmployments);
router
  .route("/:id")
  .patch(validateEmploymentId, updateEmployment)
  .delete(validateEmploymentId, deleteEmployment);

module.exports = router;
