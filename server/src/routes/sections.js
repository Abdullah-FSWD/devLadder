const { Router } = require("express");
const { getSectionDetail, getSectionsForTrack } = require("../controllers/sectionController");
const { authenticate, requireOnboarding } = require("../middleware/auth");

const router = Router();

router.get("/track/:trackId", authenticate, requireOnboarding, getSectionsForTrack);
router.get("/:id", authenticate, requireOnboarding, getSectionDetail);

module.exports = router;
