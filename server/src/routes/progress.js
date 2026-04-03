const { Router } = require("express");
const { getDashboard, getTrackProgress } = require("../controllers/progressController");
const { authenticate, requireOnboarding } = require("../middleware/auth");

const router = Router();

router.get("/", authenticate, requireOnboarding, getDashboard);
router.get("/track/:trackId", authenticate, requireOnboarding, getTrackProgress);

module.exports = router;
