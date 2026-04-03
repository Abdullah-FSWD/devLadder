const mongoose = require("mongoose");
const { EXPERIENCE_LEVELS } = require("../config/constants");

const sectionSchema = new mongoose.Schema(
  {
    track: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
      required: true,
    },
    level: {
      type: String,
      required: true,
      enum: EXPERIENCE_LEVELS,
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

// A section's position is unique within its track+level
sectionSchema.index({ track: 1, level: 1, order: 1 }, { unique: true });
// Fast lookup: all sections for a track+level, ordered
sectionSchema.index({ track: 1, level: 1 });

module.exports = mongoose.model("Section", sectionSchema);
