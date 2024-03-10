const express = require("express");
const router = express.Router();
const {
  validateEmployeeId,
  validateEmployeeInput,
} = require("../middleware/validation");
const { authorizePermissions } = require("../middleware/authentication");
const { upload } = require("../middleware/multerMiddleware");
const {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employees");

router
  .route("/")
  .get(getAllEmployees)
  .post(
    authorizePermissions("Admin", "Employee"),
    upload.none(),
    validateEmployeeInput,
    createEmployee
  );
router
  .route("/:id")
  .get(validateEmployeeId, getEmployee)
  .patch(
    authorizePermissions("Admin", "Employee"),
    upload.none(),
    validateEmployeeId,
    validateEmployeeInput,
    updateEmployee
  )
  .delete(
    authorizePermissions("Admin", "Employee"),
    validateEmployeeId,
    deleteEmployee
  );

module.exports = router;
