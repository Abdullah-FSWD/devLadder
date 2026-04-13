const { Router } = require("express");
const { getTestForSection, submitTest, getAttemptHistory } = require("../controllers/testController");
const { validate, validateObjectId } = require("../middleware/validate");
const { submitTestSchema } = require("../validators/test");
const { authenticate, requireOnboarding } = require("../middleware/auth");

const router = Router();

router.get("/section/:sectionId", authenticate, requireOnboarding, validateObjectId("sectionId"), getTestForSection);
router.post("/:testId/submit", authenticate, requireOnboarding, validateObjectId("testId"), validate(submitTestSchema), submitTest);
router.get("/:testId/attempts", authenticate, requireOnboarding, validateObjectId("testId"), getAttemptHistory);

module.exports = router;
