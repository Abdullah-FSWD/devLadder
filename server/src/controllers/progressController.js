const progressService = require("../services/progressService");
const asyncHandler = require("../utils/asyncHandler");

const getDashboard = asyncHandler(async (req, res) => {
  const progress = await progressService.getDashboardProgress(
    req.user._id,
    req.user.experienceLevel
  );
  res.json({ success: true, data: progress });
});

const getTrackProgress = asyncHandler(async (req, res) => {
  const progress = await progressService.getTrackProgress(
    req.user._id,
    req.params.trackId,
    req.user.experienceLevel
  );
  res.json({ success: true, data: progress });
});

module.exports = { getDashboard, getTrackProgress };
