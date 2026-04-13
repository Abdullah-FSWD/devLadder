const { Router } = require("express");
const { getDashboard, getTrackProgress } = require("../controllers/progressController");
const { validateObjectId } = require("../middleware/validate");
const { authenticate, requireOnboarding } = require("../middleware/auth");

const router = Router();

router.get("/", authenticate, requireOnboarding, getDashboard);
router.get("/track/:trackId", authenticate, requireOnboarding, validateObjectId("trackId"), getTrackProgress);

module.exports = router;
