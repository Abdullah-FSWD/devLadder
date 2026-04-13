const mongoose = require("mongoose");

const topicProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    // Denormalized for fast section/track-level queries
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    track: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
      required: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

topicProgressSchema.index({ user: 1, topic: 1 }, { unique: true });
topicProgressSchema.index({ user: 1, section: 1 });
topicProgressSchema.index({ user: 1, track: 1 });

module.exports = mongoose.model("TopicProgress", topicProgressSchema);
