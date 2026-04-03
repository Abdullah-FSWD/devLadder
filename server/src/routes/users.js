const { Router } = require("express");
const { setExperienceLevel } = require("../controllers/userController");
const validate = require("../middleware/validate");
const { setLevelSchema } = require("../validators/user");
const { authenticate } = require("../middleware/auth");

const router = Router();

router.put("/level", authenticate, validate(setLevelSchema), setExperienceLevel);

module.exports = router;
