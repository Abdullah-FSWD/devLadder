const { Track, Section, Topic, CourseEnrollment } = require("../models");
const AppError = require("../utils/AppError");
const cache = require("../utils/cache");

const TTL_COURSES = 3600; // 1 hour

/**
 * Returns all published tracks with isUnlocked flag per user.
 */
async function getAllCourses(userId) {
  const coursesKey = "courses:all";
  let courses = await cache.get(coursesKey);

  if (!courses) {
    courses = await Track.find({ isPublished: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    await cache.set(coursesKey, courses, TTL_COURSES);
  }

  const enrollments = await CourseEnrollment.find({ user: userId }).lean();
  const unlockedSet = new Set(enrollments.map((e) => e.track.toString()));

  // Auto-unlock the first course if the user has no enrollments yet
  if (courses.length > 0 && unlockedSet.size === 0) {
    const firstCourseId = courses[0]._id;
    await CourseEnrollment.findOneAndUpdate(
      { user: userId, track: firstCourseId },
      { user: userId, track: firstCourseId, unlockedAt: new Date() },
      { upsert: true, new: true }
    );
    unlockedSet.add(firstCourseId.toString());
  }

  return courses.map((c) => ({
    ...c,
    isUnlocked: unlockedSet.has(c._id.toString()),
  }));
}

/**
 * Returns a single course with its sections+topics and isUnlocked flag.
 */
async function getCourseById(courseId, userId) {
  const contentKey = `course:content:${courseId}`;
  let content = await cache.get(contentKey);

  if (!content) {
    const course = await Track.findOne({ _id: courseId, isPublished: true }).lean();
    if (!course) throw new AppError("Course not found", 404);

    const sections = await Section.find({ track: courseId })
      .sort({ level: 1, order: 1 })
      .lean();

    const sectionIds = sections.map((s) => s._id);
    const topics = await Topic.find({ section: { $in: sectionIds } })
      .sort({ order: 1 })
      .lean();

    const topicMap = {};
    for (const t of topics) {
      const key = t.section.toString();
      if (!topicMap[key]) topicMap[key] = [];
      topicMap[key].push(t);
    }

    const sectionsWithTopics = sections.map((s) => ({
      ...s,
      topics: topicMap[s._id.toString()] || [],
    }));

    content = { course, sections: sectionsWithTopics };
    await cache.set(contentKey, content, TTL_COURSES);
  }

  const enrollment = await CourseEnrollment.findOne({
    user: userId,
    track: courseId,
  }).lean();

  return {
    ...content.course,
    sections: content.sections,
    isUnlocked: !!enrollment,
  };
}

/**
 * Unlocks a course for a user (idempotent).
 */
async function unlockCourse(courseId, userId) {
  const course = await Track.findOne({ _id: courseId, isPublished: true }).lean();
  if (!course) throw new AppError("Course not found", 404);

  await CourseEnrollment.findOneAndUpdate(
    { user: userId, track: courseId },
    { user: userId, track: courseId, unlockedAt: new Date() },
    { upsert: true, new: true }
  );

  return { courseId, unlockedAt: new Date() };
}

/**
 * Creates a new course. Admin use only (enforced at route level).
 */
async function createCourse(data) {
  const existing = await Track.findOne({ slug: data.slug });
  if (existing) throw new AppError("A course with this slug already exists", 409);

  const course = await Track.create(data);

  // Bust list cache
  await cache.del("courses:all");

  return course;
}

module.exports = { getAllCourses, getCourseById, unlockCourse, createCourse };
