const User = require("../models/User");
const cache = require("../utils/cache");

async function setExperienceLevel(req, res, next) {
  try {
    const { experienceLevel } = req.validated;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { experienceLevel, onboardingComplete: true },
      { new: true }
    );

    // Level change invalidates all progress + section lock caches for this user
    const uid = req.user._id.toString();
    await Promise.all([
      cache.delPattern(`progress:dashboard:${uid}:*`),
      cache.delPattern(`progress:track:*:${uid}:*`),
      cache.delPattern(`sections:track:*:*:${uid}`),
    ]);

    res.json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
}

module.exports = { setExperienceLevel };
