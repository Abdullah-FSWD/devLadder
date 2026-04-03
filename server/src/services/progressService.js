const { Track, Section, Topic, Subtopic, TestAttempt, LearningLog } = require("../models");

/**
 * Returns full progress overview for a user across all tracks.
 * Used by the dashboard.
 */
async function getDashboardProgress(userId, experienceLevel) {
  const tracks = await Track.find().lean();
  const result = [];

  for (const track of tracks) {
    const trackProgress = await getTrackProgress(userId, track._id, experienceLevel);
    result.push({
      track: { _id: track._id, name: track.name, slug: track.slug },
      ...trackProgress,
    });
  }

  // Overall progress across all tracks
  const totalSections = result.reduce((sum, t) => sum + t.totalSections, 0);
  const completedSections = result.reduce((sum, t) => sum + t.completedSections, 0);
  const overallPercent = totalSections > 0
    ? Math.round((completedSections / totalSections) * 100)
    : 0;

  return { tracks: result, overallPercent };
}

/**
 * Returns progress for a single track at the user's experience level.
 */
async function getTrackProgress(userId, trackId, experienceLevel) {
  const sections = await Section.find({
    track: trackId,
    level: experienceLevel,
  })
    .sort({ order: 1 })
    .lean();

  if (sections.length === 0) {
    return { sections: [], totalSections: 0, completedSections: 0, percent: 0 };
  }

  const sectionIds = sections.map((s) => s._id);

  // Get all passed tests for these sections in one query
  const passedAttempts = await TestAttempt.find({
    user: userId,
    section: { $in: sectionIds },
    passed: true,
  }).lean();

  const passedSet = new Set(passedAttempts.map((a) => a.section.toString()));

  // Get subtopic counts per section
  const sectionProgress = await Promise.all(
    sections.map(async (section) => {
      const topics = await Topic.find({ section: section._id }).lean();
      const topicIds = topics.map((t) => t._id);
      const subtopicCount = await Subtopic.countDocuments({
        topic: { $in: topicIds },
      });

      // Count subtopics that have at least one log
      const loggedSubtopics = await LearningLog.distinct("subtopic", {
        user: userId,
        section: section._id,
      });

      const topicPercent =
        subtopicCount > 0
          ? Math.round((loggedSubtopics.length / subtopicCount) * 100)
          : 0;

      return {
        _id: section._id,
        title: section.title,
        order: section.order,
        isCompleted: passedSet.has(section._id.toString()),
        subtopicCount,
        loggedSubtopicCount: loggedSubtopics.length,
        topicPercent,
      };
    })
  );

  const completedSections = sectionProgress.filter((s) => s.isCompleted).length;
  const percent =
    sections.length > 0
      ? Math.round((completedSections / sections.length) * 100)
      : 0;

  return {
    sections: sectionProgress,
    totalSections: sections.length,
    completedSections,
    percent,
  };
}

module.exports = { getDashboardProgress, getTrackProgress };
