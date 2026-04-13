const User = require("../models/User");
const cache = require("../utils/cache");
const asyncHandler = require("../utils/asyncHandler");

const setExperienceLevel = asyncHandler(async (req, res) => {
  const { experienceLevel } = req.validated;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { experienceLevel, onboardingComplete: true },
    { new: true }
  );

  const uid = req.user._id.toString();
  await Promise.all([
    cache.delPattern(`progress:dashboard:${uid}:*`),
    cache.delPattern(`progress:track:*:${uid}:*`),
    cache.delPattern(`sections:track:*:*:${uid}`),
  ]);

  res.json({ success: true, data: { user } });
});

module.exports = { setExperienceLevel };
