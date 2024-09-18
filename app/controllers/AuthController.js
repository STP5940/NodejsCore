// const T_Users = require("../../Models/T_Users");
// const Authen = require("../../Authen");
// const func = require("../../func");

const JwtService = require('./JwtService');
// const Encryption = require('./Encryption');

// Secret key for signing the JWT
const jwtService = new JwtService();

// Controller สำหรับการ login
exports.login = async function (req, res, next) {
  try {
    const { username, password } = req.body

    // Creating a token
    const payload = { userId: 123, username: username };
    const RefreshToken = jwtService.createRefreshToken(payload, '1d'); // Token valid for 1 day
    const AccessToken = jwtService.createAccessToken(payload, '1m'); // Token valid for 1 min

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({
      status: true,
      refresh_token: RefreshToken,
      access_token: AccessToken,
    });
  } catch ({ name, message, httpcode }) {
    res.status(httpcode || 500).json({
      status: false,
      message: message,
    });
  }
};

// Users refresh
exports.refresh = async function (req, res, next) {
  try {
    const headersRefreshToken = req.headers?.authorization;

    // Verifying a RefreshToken
    const refreshTokenverified = jwtService.verifyRefreshToken(headersRefreshToken);

    // Creating a token
    const payload = { userId: refreshTokenverified?.userId, username: refreshTokenverified?.username };
    const RefreshToken = jwtService.createRefreshToken(payload, '1d'); // Token valid for 1 day
    const AccessToken = jwtService.createAccessToken(payload, '1m'); // Token valid for 1 min

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({
      status: true,
      refresh_token: RefreshToken,
      access_token: AccessToken,
    });
  } catch ({ name, message, httpcode }) {
    res.status(httpcode || 500).json({
      status: false,
      message: message,
    });
  }
};