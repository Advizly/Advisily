const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (!config.get("requiresAuth")) return next();

  const token = req.body.token || req.query.token || req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. Token not provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err)
    next("Invalid tokne. Authentication failed.");
  }
};
