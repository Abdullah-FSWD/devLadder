const testService = require("../services/testService");
const cache = require("../utils/cache");
const asyncHandler = require("../utils/asyncHandler");

const getTestForSection = asyncHandler(async (req, res) => {
  const test = await testService.getTestForSection(req.params.sectionId);
  res.json({ success: true, data: test });
});

const submitTest = asyncHandler(async (req, res) => {
  const result = await testService.submitTest(
    req.user._id,
    req.params.testId,
    req.validated.answers
  );

  const uid = req.user._id.toString();
  await Promise.all([
    cache.delPattern(`progress:dashboard:${uid}:*`),
    cache.delPattern(`progress:track:*:${uid}:*`),
    cache.delPattern(`sections:track:*:*:${uid}`),
  ]);

  res.json({ success: true, data: result });
});

const getAttemptHistory = asyncHandler(async (req, res) => {
  const attempts = await testService.getAttemptHistory(req.user._id, req.params.testId);
  res.json({ success: true, data: attempts });
});

module.exports = { getTestForSection, submitTest, getAttemptHistory };
