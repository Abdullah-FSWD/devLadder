const mongoose = require("mongoose");
const AppError = require("../utils/AppError");

/**
 * Creates middleware that validates req.body against a Zod schema.
 * On failure, returns a 400 with structured validation errors.
 */
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const messages = result.error.errors.map(
        (e) => `${e.path.join(".")}: ${e.message}`
      );
      return next(new AppError(messages.join("; "), 400));
    }
    req.validated = result.data;
    next();
  };
}

/**
 * Validates that the given route param names are valid MongoDB ObjectIds.
 * Usage: validateObjectId("id")  or  validateObjectId("trackId", "sectionId")
 */
function validateObjectId(...params) {
  return (req, res, next) => {
    for (const param of params) {
      if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
        return next(new AppError(`Invalid ID: ${param}`, 400));
      }
    }
    next();
  };
}

module.exports = { validate, validateObjectId };
