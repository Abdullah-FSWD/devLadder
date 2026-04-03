const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
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
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

topicSchema.index({ section: 1, order: 1 }, { unique: true });

module.exports = mongoose.model("Topic", topicSchema);
