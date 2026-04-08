const { Section, Topic, Subtopic, TestAttempt } = require("../models");
const AppError = require("../utils/AppError");
const cache = require("../utils/cache");

const TTL_SECTIONS = 180; // 3 min — depends on test results
const TTL_CONTENT  = 3600; // 1 hour — topics/subtopics don't change

/**
 * Returns a section with its topics and subtopics,
 * plus whether it is unlocked for the given user.
 */
async function getSectionDetail(sectionId, userId) {
  // Content (topics + subtopics) is not user-specific — cache it separately
  const contentKey = `section:content:${sectionId}`;
  let content = await cache.get(contentKey);

  if (!content) {
    const section = await Section.findById(sectionId).lean();
    if (!section) throw new AppError("Section not found", 404);

    const topics = await Topic.find({ section: sectionId })
      .sort({ order: 1 })
      .lean();

    const topicIds = topics.map((t) => t._id);
    const subtopics = await Subtopic.find({ topic: { $in: topicIds } })
      .sort({ order: 1 })
      .lean();

    const subtopicMap = {};
    for (const st of subtopics) {
      const key = st.topic.toString();
      if (!subtopicMap[key]) subtopicMap[key] = [];
      subtopicMap[key].push(st);
    }

    const topicsWithSubtopics = topics.map((t) => ({
      ...t,
      subtopics: subtopicMap[t._id.toString()] || [],
    }));

    content = { section, topicsWithSubtopics };
    await cache.set(contentKey, content, TTL_CONTENT);
  }

  const { section, topicsWithSubtopics } = content;
  const isUnlocked = await isSectionUnlocked(section, userId);

  return { ...section, topics: topicsWithSubtopics, isUnlocked };
}

/**
 * A section is unlocked if:
 * - It is the first section in its track+level (order === 1), OR
 * - The previous section's test has been passed by the user
 */
async function isSectionUnlocked(section, userId) {
  if (section.order === 1) return true;

  const previousSection = await Section.findOne({
    track: section.track,
    level: section.level,
    order: section.order - 1,
  }).lean();

  if (!previousSection) return true;

  const passedAttempt = await TestAttempt.findOne({
    user: userId,
    section: previousSection._id,
    passed: true,
  }).lean();

  return !!passedAttempt;
}

/**
 * Returns lock status for all sections in a track+level for a user.
 */
async function getSectionsWithLockStatus(trackId, level, userId) {
  const key = `sections:track:${trackId}:${level}:${userId}`;
  const hit = await cache.get(key);
  if (hit) return hit;

  const sections = await Section.find({ track: trackId, level })
    .sort({ order: 1 })
    .lean();

  const passedAttempts = await TestAttempt.find({
    user: userId,
    section: { $in: sections.map((s) => s._id) },
    passed: true,
  }).lean();

  const passedSectionIds = new Set(
    passedAttempts.map((a) => a.section.toString())
  );

  const data = sections.map((section, index) => ({
    ...section,
    isUnlocked: index === 0 || passedSectionIds.has(sections[index - 1]._id.toString()),
    isCompleted: passedSectionIds.has(section._id.toString()),
  }));

  await cache.set(key, data, TTL_SECTIONS);
  return data;
}

module.exports = { getSectionDetail, isSectionUnlocked, getSectionsWithLockStatus };
