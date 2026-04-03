const trackService = require("../services/trackService");
const AppError = require("../utils/AppError");

async function getAllTracks(req, res, next) {
  try {
    const tracks = await trackService.getAllTracks();
    res.json({ success: true, data: tracks });
  } catch (err) {
    next(err);
  }
}

async function getTrackBySlug(req, res, next) {
  try {
    const track = await trackService.getTrackBySlug(req.params.slug);
    if (!track) throw new AppError("Track not found", 404);
    res.json({ success: true, data: track });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllTracks, getTrackBySlug };
