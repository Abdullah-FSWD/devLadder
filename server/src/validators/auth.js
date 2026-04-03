const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().email().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
});

const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(1),
});

module.exports = { registerSchema, loginSchema };
