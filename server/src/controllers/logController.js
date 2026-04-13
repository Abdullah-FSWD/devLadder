const logService = require("../services/logService");
const cache = require("../utils/cache");
const asyncHandler = require("../utils/asyncHandler");

const createLog = asyncHandler(async (req, res) => {
  const log = await logService.createLog(req.user._id, req.validated);

  const uid = req.user._id.toString();
  await Promise.all([
    cache.delPattern(`progress:dashboard:${uid}:*`),
    cache.delPattern(`progress:track:*:${uid}:*`),
  ]);

  res.status(201).json({ success: true, data: log });
});

const getLogsBySubtopic = asyncHandler(async (req, res) => {
  const logs = await logService.getLogsBySubtopic(req.user._id, req.params.subtopicId);
  res.json({ success: true, data: logs });
});

const getLogsBySection = asyncHandler(async (req, res) => {
  const logs = await logService.getLogsBySection(req.user._id, req.params.sectionId);
  res.json({ success: true, data: logs });
});

module.exports = { createLog, getLogsBySubtopic, getLogsBySection };
