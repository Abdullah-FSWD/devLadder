const logService = require("../services/logService");

async function createLog(req, res, next) {
  try {
    const log = await logService.createLog(req.user._id, req.validated);
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
