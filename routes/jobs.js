const express = require("express");
const router = express.Router();
const { validateJobId, validateJobInput } = require("../middleware/validation");
const { authorizePermissions } = require("../middleware/authentication");
const { upload } = require("../middleware/multerMiddleware");
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(
  upload.single("jobImage"),
  validateJobInput,
  authorizePermissions("Admin", "Employer"),
  createJob
);
router
  .route("/:id")
  .get(validateJobId, getJob)
  .patch(
    authorizePermissions("Admin", "Employer"),
    upload.single("jobImage"),
    validateJobId,
    validateJobInput,
    updateJob
  )
  .delete(authorizePermissions("Admin", "Employer"), validateJobId, deleteJob);

module.exports = router;
