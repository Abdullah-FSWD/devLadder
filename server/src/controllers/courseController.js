const courseService = require("../services/courseService");
const asyncHandler = require("../utils/asyncHandler");

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await courseService.getAllCourses(req.user._id);
  res.json({ success: true, data: courses });
});

const getCourseById = asyncHandler(async (req, res) => {
  const course = await courseService.getCourseById(req.params.id, req.user._id);
  res.json({ success: true, data: course });
});

const unlockCourse = asyncHandler(async (req, res) => {
  const result = await courseService.unlockCourse(req.params.id, req.user._id);
  res.json({ success: true, data: result });
});

const createCourse = asyncHandler(async (req, res) => {
  const course = await courseService.createCourse(req.body);
  res.status(201).json({ success: true, data: course });
});

module.exports = { getAllCourses, getCourseById, unlockCourse, createCourse };
