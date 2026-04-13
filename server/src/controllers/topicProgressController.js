const topicProgressService = require("../services/topicProgressService");
const asyncHandler = require("../utils/asyncHandler");

const completeTopic = asyncHandler(async (req, res) => {
  const record = await topicProgressService.completeTopic(req.params.id, req.user._id);
  res.status(201).json({ success: true, data: record });
});

const uncompleteTopic = asyncHandler(async (req, res) => {
  const result = await topicProgressService.uncompleteTopic(req.params.id, req.user._id);
  res.json({ success: true, data: result });
});

const getSectionProgress = asyncHandler(async (req, res) => {
  const progress = await topicProgressService.getProgressForSection(
    req.params.sectionId,
    req.user._id
  );
  res.json({ success: true, data: progress });
});

module.exports = { completeTopic, uncompleteTopic, getSectionProgress };
