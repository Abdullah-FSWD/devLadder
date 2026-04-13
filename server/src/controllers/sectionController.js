const sectionService = require("../services/sectionService");
const asyncHandler = require("../utils/asyncHandler");

const getSectionDetail = asyncHandler(async (req, res) => {
  const section = await sectionService.getSectionDetail(req.params.id, req.user._id);
  res.json({ success: true, data: section });
});

const getSectionsForTrack = asyncHandler(async (req, res) => {
  const sections = await sectionService.getSectionsWithLockStatus(
    req.params.trackId,
    req.user.experienceLevel,
    req.user._id
  );
  res.json({ success: true, data: sections });
});

module.exports = { getSectionDetail, getSectionsForTrack };
