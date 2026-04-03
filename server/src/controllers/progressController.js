const progressService = require("../services/progressService");

async function getDashboard(req, res, next) {
  try {
    const progress = await progressService.getDashboardProgress(
      req.user._id,
      req.user.experienceLevel
    );
    res.json({ success: true, data: progress });
  } catch (err) {
    next(err);
  }
}

async function getTrackProgress(req, res, next) {
  try {
    const progress = await progressService.getTrackProgress(
      req.user._id,
      req.params.trackId,
      req.user.experienceLevel
    );
    res.json({ success: true, data: progress });
  } catch (err) {
    next(err);
  }
}

module.exports = { getDashboard, getTrackProgress };
