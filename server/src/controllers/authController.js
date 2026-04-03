const authService = require("../services/authService");
const { jwt: jwtConfig } = require("../config/env");

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/api/auth/refresh",
};

async function register(req, res, next) {
  try {
    const { user, accessToken, refreshToken } = await authService.register(
      req.validated
    );
    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
    res.status(201).json({ success: true, data: { user, accessToken } });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { user, accessToken, refreshToken } = await authService.login(
      req.validated
    );
    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
    res.json({ success: true, data: { user, accessToken } });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const token = req.cookies.refreshToken;
    const { accessToken, refreshToken } = await authService.refresh(token);
    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
    res.json({ success: true, data: { accessToken } });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    await authService.logout(req.user._id);
    res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
    res.json({ success: true, message: "Logged out" });
  } catch (err) {
    next(err);
  }
}

async function me(req, res) {
  res.json({ success: true, data: { user: req.user } });
}

module.exports = { register, login, refresh, logout, me };
