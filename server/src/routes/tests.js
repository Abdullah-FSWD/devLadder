const { Router } = require("express");
const { getTestForSection, submitTest, getAttemptHistory } = require("../controllers/testController");
const validate = require("../middleware/validate");
const { submitTestSchema } = require("../validators/test");
const { authenticate, requireOnboarding } = require("../middleware/auth");

const router = Router();

router.get("/section/:sectionId", authenticate, requireOnboarding, getTestForSection);
router.post("/:testId/submit", authenticate, requireOnboarding, validate(submitTestSchema), submitTest);
router.get("/:testId/attempts", authenticate, requireOnboarding, getAttemptHistory);

module.exports = router;
