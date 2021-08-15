require("dotenv").config();
const privateKey = require("config").get("jwtPrivateKey");
const jwt = require("jsonwebtoken");

module.exports = (userInfo) => jwt.sign(userInfo, privateKey);
