const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: {
      type: [String],
      validate: {
        validator: (v) => v.length === 4,
        message: "Each question must have exactly 4 options",
      },
    },
    // Index of the correct option (0-3)
    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
  },
  { _id: true }
);

const testSchema = new mongoose.Schema(
  {
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
      unique: true, // one test per section
    },
    title: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
      validate: {
        validator: (v) => v.length >= 5,
        message: "A test must have at least 5 questions",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);
