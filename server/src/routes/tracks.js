const { Router } = require("express");
const { getAllTracks, getTrackBySlug } = require("../controllers/trackController");
const { authenticate, requireOnboarding } = require("../middleware/auth");

const router = Router();

router.get("/", authenticate, requireOnboarding, getAllTracks);
router.get("/:slug", authenticate, requireOnboarding, getTrackBySlug);

module.exports = router;
