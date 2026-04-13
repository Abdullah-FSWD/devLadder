const { Router } = require("express");
const { completeTopic, uncompleteTopic, getSectionProgress } = require("../controllers/topicProgressController");
const { validateObjectId } = require("../middleware/validate");
const { authenticate, requireOnboarding } = require("../middleware/auth");

const router = Router();

router.post("/:id/complete", authenticate, requireOnboarding, validateObjectId("id"), completeTopic);
router.delete("/:id/complete", authenticate, requireOnboarding, validateObjectId("id"), uncompleteTopic);
router.get("/section/:sectionId", authenticate, requireOnboarding, validateObjectId("sectionId"), getSectionProgress);

module.exports = router;
