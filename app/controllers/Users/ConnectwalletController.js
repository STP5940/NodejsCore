const dateTime = require("../DateTime");

module.exports = {
  get: async (req, res) => {
    try {

      res.render("connectwallet");
    } catch ({ name, message, httpcode }) {
      res.status(httpcode || 500).json({
        status: false,
        message: message,
      });
    }
  },

  create: async (req, res) => {
    try {
      // const dataUse = Authen.decodeJwt(req.headers.authorization);

      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({
        status: true,
        message: "Create Success",
      });
    } catch ({ name, message, httpcode }) {
      res.status(httpcode || 500).json({
        status: false,
        message: message,
      });
    }
  },

  update: async (req, res) => {
    try {
      // const dataUse = Authen.decodeJwt(req.headers.authorization);

      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({
        status: true,
        message: "Update Success",
      });
    } catch ({ name, message, httpcode }) {
      res.status(httpcode || 500).json({
        status: false,
        message: message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      // const dataUse = Authen.decodeJwt(req.headers.authorization);

      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({
        status: true,
        message: "Delete Success",
      });
    } catch ({ name, message, httpcode }) {
      res.status(httpcode || 500).json({
        status: false,
        message: message,
      });
    }
  },
};
