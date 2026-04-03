const User = require("../models/User");

async function setExperienceLevel(req, res, next) {
  try {
    const { experienceLevel } = req.validated;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { experienceLevel, onboardingComplete: true },
      { new: true }
    );
    res.json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
}

module.exports = { setExperienceLevel };
