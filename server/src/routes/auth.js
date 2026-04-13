const { Router } = require("express");
const {
  register,
  login,
  refresh,
  logout,
  me,
  verifyEmail,
  resendVerification,
} = require("../controllers/authController");
const { validate } = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validators/auth");
const { authenticate } = require("../middleware/auth");

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, me);

router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", authenticate, resendVerification);

module.exports = router;
