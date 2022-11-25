const cors = require("cors");
const config = require("config");

module.exports = function corsConfig(req, res, next) {
  const corsOptions = {
    origin: config.get("cors"),
    optionsSuccessStatus: 200,
  };
  cors(corsOptions)(req, res, next);
};
