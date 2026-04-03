const { Router } = require("express");
const { createLog, getLogsBySubtopic, getLogsBySection } = require("../controllers/logController");
const validate = require("../middleware/validate");
const { createLogSchema } = require("../validators/log");
const { authenticate, requireOnboarding } = require("../middleware/auth");

const router = Router();

router.post("/", authenticate, requireOnboarding, validate(createLogSchema), createLog);
router.get("/subtopic/:subtopicId", authenticate, requireOnboarding, getLogsBySubtopic);
router.get("/section/:sectionId", authenticate, requireOnboarding, getLogsBySection);

module.exports = router;
