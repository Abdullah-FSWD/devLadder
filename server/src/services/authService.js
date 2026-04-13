const crypto = require("crypto");
const User = require("../models/User");
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../utils/jwt");
const { sendVerificationEmail } = require("../utils/email");
const AppError = require("../utils/AppError");

// Store hashed token in DB; send raw token in email
function generateVerificationToken() {
  const raw = crypto.randomBytes(32).toString("hex");
  const hashed = crypto.createHash("sha256").update(raw).digest("hex");
  return { raw, hashed };
}

async function register({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) throw new AppError("Email already registered", 409);

  const { raw, hashed } = generateVerificationToken();

  const user = await User.create({
    name,
    email,
    password,
    emailVerificationToken: hashed,
    emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
  });

  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save();

  // Fire-and-forget — don't fail registration if email sending fails
  sendVerificationEmail(email, raw).catch(console.error);

  return { user, accessToken, refreshToken };
}

async function verifyEmail(token) {
  const hashed = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashed,
    emailVerificationExpires: { $gt: Date.now() },
  }).select("+emailVerificationToken +emailVerificationExpires");

  if (!user) throw new AppError("Invalid or expired verification link", 400);

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  return user;
}

async function resendVerification(userId) {
  const user = await User.findById(userId).select(
    "+emailVerificationToken +emailVerificationExpires"
  );

  if (!user) throw new AppError("User not found", 404);
  if (user.isEmailVerified) throw new AppError("Email is already verified", 400);

  const { raw, hashed } = generateVerificationToken();
  user.emailVerificationToken = hashed;
  user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await user.save();

  await sendVerificationEmail(user.email, raw);

  return { message: "Verification email sent" };
}

async function login({ email, password }) {
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
}

async function refresh(token) {
  if (!token) throw new AppError("Refresh token required", 401);

  let decoded;
  try {
    decoded = verifyRefreshToken(token);
  } catch {
    throw new AppError("Invalid refresh token", 401);
  }

  const user = await User.findById(decoded.userId).select("+refreshToken");
  if (!user || user.refreshToken !== token) {
    throw new AppError("Invalid refresh token", 401);
  }

  const accessToken = signAccessToken(user._id);
  const newRefreshToken = signRefreshToken(user._id);
  user.refreshToken = newRefreshToken;
  await user.save();

  return { accessToken, refreshToken: newRefreshToken };
}

async function logout(userId) {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
}

module.exports = { register, login, refresh, logout, verifyEmail, resendVerification };
