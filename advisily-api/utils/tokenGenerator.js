const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (userInfo) => jwt.sign(userInfo, config.get("jwtPrivateKey"));
