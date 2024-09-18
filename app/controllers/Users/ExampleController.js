// const T_Users = require("../../Models/T_Users");
// const Authen = require("../../Authen");
// const func = require("../../func");

const JwtService = require('../JwtService');
const { validationResult } = require("express-validator");

// Secret key for signing the JWT
const jwtService = new JwtService();

// Users show
exports.show = async function (req, res, next) {
  try {
    const accessTokenverified = jwtService.verifyAccessToken(req.headers?.authorization);

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({
      status: true,
      // datetime: func.getFormatDate('YYYY-MM-DD HH:mm:ss'),
      message: "Show Success",
      username: accessTokenverified?.username,
    });
  } catch ({ name, message, httpcode }) {
    res.status(httpcode || 500).json({
      status: false,
      message: message,
    });
  }
};

// Users create
exports.store = async function (req, res, next) {
  try {
    // let dataUse = Authen.decodeJwt(req.headers.authorization);

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({
      status: true,
      // datetime: func.getFormatDate('YYYY-MM-DD HH:mm:ss'),
      message: "Store Success",
    });
  } catch ({ name, message, httpcode }) {
    res.status(httpcode || 500).json({
      status: false,
      message: message,
    });
  }
};

// Users update
exports.update = async function (req, res, next) {
  try {
    // let dataUse = Authen.decodeJwt(req.headers.authorization);

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({
      status: true,
      // datetime: func.getFormatDate('YYYY-MM-DD HH:mm:ss'),
      message: "Update Success",
    });
  } catch ({ name, message, httpcode }) {
    res.status(httpcode || 500).json({
      status: false,
      message: message,
    });
  }
};

// Users delete
exports.destroy = async function (req, res, next) {
  try {
    // let dataUse = Authen.decodeJwt(req.headers.authorization);

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({
      status: true,
      // datetime: func.getFormatDate('YYYY-MM-DD HH:mm:ss'),
      message: "Destroy Success",
    });
  } catch ({ name, message, httpcode }) {
    res.status(httpcode || 500).json({
      status: false,
      message: message,
    });
  }
};
