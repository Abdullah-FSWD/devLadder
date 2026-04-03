const sectionService = require("../services/sectionService");

async function getSectionDetail(req, res, next) {
  try {
    const section = await sectionService.getSectionDetail(
      req.params.id,
      req.user._id
    );
    res.json({ success: true, data: section });
  } catch (err) {
    next(err);
  }
}

async function getSectionsForTrack(req, res, next) {
  try {
    const sections = await sectionService.getSectionsWithLockStatus(
      req.params.trackId,
      req.user.experienceLevel,
      req.user._id
    );
    res.json({ success: true, data: sections });
  } catch (err) {
    next(err);
  }
}

module.exports = { getSectionDetail, getSectionsForTrack };
