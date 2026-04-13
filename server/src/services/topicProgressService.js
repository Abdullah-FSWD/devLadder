const { Topic, Section, TopicProgress } = require("../models");
const AppError = require("../utils/AppError");

/**
 * Marks a topic as complete for a user.
 */
async function completeTopic(topicId, userId) {
  const topic = await Topic.findById(topicId).lean();
  if (!topic) throw new AppError("Topic not found", 404);

  const section = await Section.findById(topic.section).lean();
  if (!section) throw new AppError("Section not found", 404);

  const record = await TopicProgress.findOneAndUpdate(
    { user: userId, topic: topicId },
    {
      user: userId,
      topic: topicId,
      section: topic.section,
      track: section.track,
      completedAt: new Date(),
    },
    { upsert: true, new: true }
  );

  return record;
}

/**
 * Unmarks a topic as complete for a user.
 */
async function uncompleteTopic(topicId, userId) {
  const deleted = await TopicProgress.findOneAndDelete({
    user: userId,
    topic: topicId,
  });
  if (!deleted) throw new AppError("Topic was not marked complete", 404);
  return { topicId, uncompleted: true };
}

/**
 * Returns set of completed topicIds for a user within a section.
 */
async function getProgressForSection(sectionId, userId) {
  const records = await TopicProgress.find({
    user: userId,
    section: sectionId,
  })
    .select("topic completedAt")
    .lean();

  return records.map((r) => ({
    topicId: r.topic,
    completedAt: r.completedAt,
  }));
}

module.exports = { completeTopic, uncompleteTopic, getProgressForSection };
