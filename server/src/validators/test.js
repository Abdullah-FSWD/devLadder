const { z } = require("zod");

const submitTestSchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.string().min(1),
        selectedAnswer: z.number().int().min(0).max(3),
      })
    )
    .min(1),
});

module.exports = { submitTestSchema };
