const { LearningLog, Subtopic, Topic } = require("../models");
const AppError = require("../utils/AppError");

async function createLog(userId, { subtopicId, report, timeSpentMinutes }) {
  const subtopic = await Subtopic.findById(subtopicId).lean();
  if (!subtopic) throw new AppError("Subtopic not found", 404);

  const topic = await Topic.findById(subtopic.topic).lean();
  if (!topic) throw new AppError("Topic not found", 404);

  const log = await LearningLog.create({
    user: userId,
    subtopic: subtopicId,
    section: topic.section,
    topicTitle: topic.title,
    report,
    timeSpentMinutes,
  });

  return log;
}

async function getLogsBySubtopic(userId, subtopicId) {
  return LearningLog.find({ user: userId, subtopic: subtopicId })
    .sort({ createdAt: -1 })
    .lean();
}

async function getLogsBySection(userId, sectionId) {
  return LearningLog.find({ user: userId, section: sectionId })
    .sort({ createdAt: -1 })
    .lean();
}

module.exports = { createLog, getLogsBySubtopic, getLogsBySection };
