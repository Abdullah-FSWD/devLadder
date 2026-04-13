const { Router } = require("express");
const { getAllCourses, getCourseById, unlockCourse, createCourse } = require("../controllers/courseController");
const { validateObjectId } = require("../middleware/validate");
const { authenticate, requireOnboarding } = require("../middleware/auth");

const router = Router();

router.get("/", authenticate, requireOnboarding, getAllCourses);
router.get("/:id", authenticate, requireOnboarding, validateObjectId("id"), getCourseById);
router.post("/:id/unlock", authenticate, requireOnboarding, validateObjectId("id"), unlockCourse);
router.post("/", authenticate, createCourse);

module.exports = router;
