const mongoose = require("mongoose");

const testAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
        selectedAnswer: { type: Number, required: true, min: 0, max: 3 },
      },
    ],
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctCount: {
      type: Number,
      required: true,
    },
    score: {
      type: Number, // 0.0 to 1.0
      required: true,
    },
    passed: {
      type: Boolean,
      required: true,
    },
    // Calendar date of the attempt (YYYY-MM-DD) for daily limit enforcement
    attemptDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Enforce one attempt per user per test per calendar day
testAttemptSchema.index(
  { user: 1, test: 1, attemptDate: 1 },
  { unique: true }
);

// Quick lookup: has this user passed this section's test?
testAttemptSchema.index({ user: 1, section: 1, passed: 1 });

module.exports = mongoose.model("TestAttempt", testAttemptSchema);
