const logService = require("../services/logService");
const cache = require("../utils/cache");

async function createLog(req, res, next) {
  try {
    const log = await logService.createLog(req.user._id, req.validated);

    // Progress depends on which subtopics have been logged — bust both caches
    const uid = req.user._id.toString();
    const lvl = req.user.experienceLevel;
    await Promise.all([
      cache.delPattern(`progress:dashboard:${uid}:*`),
      cache.delPattern(`progress:track:*:${uid}:*`),
    ]);

    res.status(201).json({ success: true, data: log });
  } catch (err) {
    next(err);
  }
}

async function getLogsBySubtopic(req, res, next) {
  try {
    const logs = await logService.getLogsBySubtopic(
      req.user._id,
      req.params.subtopicId
    );
    res.json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
}

async function getLogsBySection(req, res, next) {
  try {
    const logs = await logService.getLogsBySection(
      req.user._id,
      req.params.sectionId
    );
    res.json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
}

module.exports = { createLog, getLogsBySubtopic, getLogsBySection };
