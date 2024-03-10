const express = require("express");
const router = express.Router();
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../middleware/validation");
const { register, login, logout } = require("../controllers/auth");
const rateLimiter = require("express-rate-limit");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: { msg: "IP rate limit exceeded, retry in 15 minutes." },
});

router.post("/register", apiLimiter, validateRegisterInput, register);
router.post("/login", apiLimiter, validateLoginInput, login);
router.get("/logout", logout);

module.exports = router;
