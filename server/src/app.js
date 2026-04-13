const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const { clientUrl, nodeEnv } = require("./config/env");
const errorHandler = require("./middleware/errorHandler");
const dns = require("dns");

const app = express();
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Security headers
app.use(helmet());

// CORS — allow one or more frontend origins (comma-separated in CLIENT_URL)
const allowedOrigins = clientUrl.split(",").map((o) => o.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Request logging
if (nodeEnv === "development") {
  app.use(morgan("dev"));
}

// Body parsing
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Global rate limit — 100 requests per 15 min per IP
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: "Too many requests, slow down" },
  })
);

// Stricter rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many auth attempts, try later" },
});

// Routes
app.use("/api/auth", authLimiter, require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/tracks", require("./routes/tracks"));
app.use("/api/sections", require("./routes/sections"));
app.use("/api/logs", require("./routes/logs"));
app.use("/api/tests", require("./routes/tests"));
app.use("/api/progress", require("./routes/progress"));
app.use("/api/courses", require("./routes/courses"));
app.use("/api/topics", require("./routes/topicProgress"));

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
