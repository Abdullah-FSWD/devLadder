const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: {
      type: String,
      enum: ["article", "video", "documentation", "course", "practice"],
      default: "article",
    },
  },
  { _id: false }
);

const subtopicSchema = new mongoose.Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    resources: [resourceSchema],
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

subtopicSchema.index({ topic: 1, order: 1 }, { unique: true });

module.exports = mongoose.model("Subtopic", subtopicSchema);
