const { nodeEnv } = require("../config/env");

function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational || false;

  // Log unexpected errors
  if (!isOperational) {
    console.error("UNEXPECTED ERROR:", err);
  }

  res.status(statusCode).json({
    success: false,
    message: isOperational ? err.message : "Internal server error",
    ...(nodeEnv === "development" && !isOperational && { stack: err.stack }),
  });
}

module.exports = errorHandler;
