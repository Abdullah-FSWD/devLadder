const authService = require("../services/authService");
const asyncHandler = require("../utils/asyncHandler");

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/api/auth/refresh",
};

const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.register(req.validated);
  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
  res.status(201).json({ success: true, data: { user, accessToken } });
});

const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.validated);
  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
  res.json({ success: true, data: { user, accessToken } });
});

const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  const { accessToken, refreshToken } = await authService.refresh(token);
  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
  res.json({ success: true, data: { accessToken } });
});

const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user._id);
  res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
  res.json({ success: true, message: "Logged out" });
});

function me(req, res) {
  res.json({ success: true, data: { user: req.user } });
}

const verifyEmail = asyncHandler(async (req, res) => {
  const user = await authService.verifyEmail(req.params.token);
  res.json({ success: true, data: { user } });
});

const resendVerification = asyncHandler(async (req, res) => {
  const result = await authService.resendVerification(req.user._id);
  res.json({ success: true, data: result });
});

module.exports = { register, login, refresh, logout, me, verifyEmail, resendVerification };
