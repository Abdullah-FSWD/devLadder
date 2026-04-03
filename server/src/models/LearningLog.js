const mongoose = require("mongoose");
const { MAX_LOG_LENGTH } = require("../config/constants");

const learningLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subtopic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subtopic",
      required: true,
    },
    // Denormalized for fast progress queries without joins
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    topicTitle: {
      type: String,
      required: true,
    },
    report: {
      type: String,
      required: true,
      maxlength: MAX_LOG_LENGTH,
    },
    timeSpentMinutes: {
      type: Number,
      required: true,
      min: 1,
      max: 1440, // max 24 hours
    },
  },
  { timestamps: true }
);

// All logs for a user+subtopic, newest first
learningLogSchema.index({ user: 1, subtopic: 1, createdAt: -1 });
// Fast check: which subtopics has this user logged in a section?
learningLogSchema.index({ user: 1, section: 1 });

module.exports = mongoose.model("LearningLog", learningLogSchema);
