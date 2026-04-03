const jwt = require("jsonwebtoken");
const { jwt: jwtConfig } = require("../config/env");

function signAccessToken(userId) {
  return jwt.sign({ userId }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
}

function signRefreshToken(userId) {
  return jwt.sign({ userId }, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpiresIn,
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, jwtConfig.secret);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, jwtConfig.refreshSecret);
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
