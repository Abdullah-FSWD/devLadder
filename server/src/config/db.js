const mongoose = require("mongoose");
const { mongoUri } = require("./env");
const dns = require("dns");

async function connectDB() {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
  try {
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
