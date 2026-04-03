const testService = require("../services/testService");

async function getTestForSection(req, res, next) {
  try {
    const test = await testService.getTestForSection(req.params.sectionId);
    res.json({ success: true, data: test });
  } catch (err) {
    next(err);
  }
}

async function submitTest(req, res, next) {
  try {
    const result = await testService.submitTest(
      req.user._id,
      req.params.testId,
      req.validated.answers
    );
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function getAttemptHistory(req, res, next) {
  try {
    const attempts = await testService.getAttemptHistory(
      req.user._id,
      req.params.testId
    );
    res.json({ success: true, data: attempts });
  } catch (err) {
    next(err);
  }
}

module.exports = { getTestForSection, submitTest, getAttemptHistory };
