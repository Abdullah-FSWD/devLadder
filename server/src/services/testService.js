const { Test, TestAttempt } = require("../models");
const { isSectionUnlocked } = require("./sectionService");
const { TEST_PASS_THRESHOLD } = require("../config/constants");
const { todayDateString } = require("../utils/date");
const AppError = require("../utils/AppError");

/**
 * Returns the test for a section, with correct answers stripped.
 */
async function getTestForSection(sectionId) {
  const test = await Test.findOne({ section: sectionId }).lean();
  if (!test) throw new AppError("No test found for this section", 404);

  // Strip correct answers before sending to client
  const questions = test.questions.map(({ _id, question, options }) => ({
    _id,
    question,
    options,
  }));

  return { _id: test._id, title: test.title, questions };
}

/**
 * Submits a test attempt.
 * Enforces: section unlocked, one attempt per day, scoring, pass/fail.
 */
async function submitTest(userId, testId, answers) {
  const test = await Test.findById(testId);
  if (!test) throw new AppError("Test not found", 404);

  // Check section is unlocked
  const section = await require("../models/Section").findById(test.section).lean();
  const unlocked = await isSectionUnlocked(section, userId);
  if (!unlocked) {
    throw new AppError("This section is locked. Complete the previous section first.", 403);
  }

  // Already passed?
  const alreadyPassed = await TestAttempt.findOne({
    user: userId,
    test: testId,
    passed: true,
  });
  if (alreadyPassed) {
    throw new AppError("You have already passed this test", 400);
  }

  // Check daily attempt limit
  const today = todayDateString();
  const todayAttempt = await TestAttempt.findOne({
    user: userId,
    test: testId,
    attemptDate: today,
  });
  if (todayAttempt) {
    throw new AppError(
      "You have already attempted this test today. Try again tomorrow.",
      429
    );
  }

  // Score the test
  const questionMap = new Map();
  for (const q of test.questions) {
    questionMap.set(q._id.toString(), q.correctAnswer);
  }

  let correctCount = 0;
  const gradedAnswers = answers.map((a) => {
    const correctAnswer = questionMap.get(a.questionId);
    if (correctAnswer !== undefined && a.selectedAnswer === correctAnswer) {
      correctCount++;
    }
    return a;
  });

  const score = correctCount / test.questions.length;
  const passed = score >= TEST_PASS_THRESHOLD;

  const attempt = await TestAttempt.create({
    user: userId,
    test: testId,
    section: test.section,
    answers: gradedAnswers,
    totalQuestions: test.questions.length,
    correctCount,
    score,
    passed,
    attemptDate: today,
  });

  return {
    attemptId: attempt._id,
    totalQuestions: test.questions.length,
    correctCount,
    score: Math.round(score * 100),
    passed,
  };
}

/**
 * Returns attempt history for a user on a specific test.
 */
async function getAttemptHistory(userId, testId) {
  return TestAttempt.find({ user: userId, test: testId })
    .sort({ createdAt: -1 })
    .select("score passed correctCount totalQuestions attemptDate createdAt")
    .lean();
}

module.exports = { getTestForSection, submitTest, getAttemptHistory };
