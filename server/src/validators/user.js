const { z } = require("zod");
const { EXPERIENCE_LEVELS } = require("../config/constants");

const setLevelSchema = z.object({
  experienceLevel: z.enum(EXPERIENCE_LEVELS),
});

module.exports = { setLevelSchema };
