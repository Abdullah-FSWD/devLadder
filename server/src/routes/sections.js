const { Router } = require("express");
const { getSectionDetail, getSectionsForTrack } = require("../controllers/sectionController");
const { validateObjectId } = require("../middleware/validate");
const { authenticate, requireOnboarding } = require("../middleware/auth");

const router = Router();

router.get("/track/:trackId", authenticate, requireOnboarding, validateObjectId("trackId"), getSectionsForTrack);
router.get("/:id", authenticate, requireOnboarding, validateObjectId("id"), getSectionDetail);

module.exports = router;
