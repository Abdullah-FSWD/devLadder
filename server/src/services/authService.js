const User = require("../models/User");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const AppError = require("../utils/AppError");

async function register({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new AppError("Email already registered", 409);
  }

  const user = await User.create({ name, email, password });
  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
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
  if (!token) {
    throw new AppError("Refresh token required", 401);
  }

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

  // Rotate refresh token
  const accessToken = signAccessToken(user._id);
  const newRefreshToken = signRefreshToken(user._id);

  user.refreshToken = newRefreshToken;
  await user.save();

  return { accessToken, refreshToken: newRefreshToken };
}

async function logout(userId) {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
}

module.exports = { register, login, refresh, logout };
