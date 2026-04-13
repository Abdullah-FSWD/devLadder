const trackService = require("../services/trackService");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

const getAllTracks = asyncHandler(async (req, res) => {
  const tracks = await trackService.getAllTracks();
  res.json({ success: true, data: tracks });
});

const getTrackBySlug = asyncHandler(async (req, res) => {
  const track = await trackService.getTrackBySlug(req.params.slug);
  if (!track) throw new AppError("Track not found", 404);
  res.json({ success: true, data: track });
});

module.exports = { getAllTracks, getTrackBySlug };
