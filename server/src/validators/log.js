const { z } = require("zod");
const { MAX_LOG_LENGTH } = require("../config/constants");

const createLogSchema = z.object({
  subtopicId: z.string().min(1),
  report: z.string().min(1).max(MAX_LOG_LENGTH),
  timeSpentMinutes: z.number().int().min(1).max(1440),
});

module.exports = { createLogSchema };
