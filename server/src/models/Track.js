const mongoose = require("mongoose");
const { TRACK_TYPES } = require("../config/constants");

const trackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      enum: TRACK_TYPES,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String, // icon name or URL
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Track", trackSchema);
