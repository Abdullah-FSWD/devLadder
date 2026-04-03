const { verifyAccessToken } = require("../utils/jwt");
const AppError = require("../utils/AppError");
const User = require("../models/User");

/**
 * Extracts and verifies the JWT from the Authorization header.
 * Attaches the full user document to req.user.
 */
async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      throw new AppError("Authentication required", 401);
    }

    const token = header.split(" ")[1];
    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new AppError("User no longer exists", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return next(new AppError("Invalid or expired token", 401));
    }
    next(err);
  }
}

/**
 * Requires onboarding to be complete (experience level set).
 * Must be used after authenticate middleware.
 */
function requireOnboarding(req, res, next) {
  if (!req.user.onboardingComplete) {
    return next(new AppError("Please complete onboarding first", 403));
  }
  next();
}

module.exports = { authenticate, requireOnboarding };
