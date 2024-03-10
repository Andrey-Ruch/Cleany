const express = require("express");
const router = express.Router();
const {
  validateUpdateUserInput,
  validateUserId,
} = require("../middleware/validation");
const { authorizePermissions } = require("../middleware/authentication");
const { upload } = require("../middleware/multerMiddleware");
const {
  getCurrentUser,
  getUser,
  updateUser,
  // updateUserPassword,
  getAppStats,
} = require("../controllers/users");

router.get("/currentUser", getCurrentUser);
router.patch(
  "/updateUser",
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);
// router.patch("/updateUserPassword", updateUserPassword);
router.get("/admin/appStats", authorizePermissions("Admin"), getAppStats);
router.route("/:id").get(validateUserId, getUser);

module.exports = router;
