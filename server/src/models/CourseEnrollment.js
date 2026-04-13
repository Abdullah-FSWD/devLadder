const mongoose = require("mongoose");

const courseEnrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    track: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
      required: true,
    },
    unlockedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

courseEnrollmentSchema.index({ user: 1, track: 1 }, { unique: true });

module.exports = mongoose.model("CourseEnrollment", courseEnrollmentSchema);
