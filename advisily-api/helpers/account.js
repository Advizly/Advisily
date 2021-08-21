require("dotenv").config();
const privateKey = require("config").get("jwtPrivateKey");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

module.exports = {
  getAuthToken,
  getRandomToken,
  hash,
  basicInfo,
};
function getAuthToken(user) {
  return jwt.sign(basicInfo(user), privateKey);
}

async function getRandomToken() {
  return crypto.randomBytes(40).toString("hex");
}

async function hash(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

function basicInfo(user) {
  const { firstName, lastName, studentId, email, isVerified } = user;
  return { firstName, lastName, studentId, email, isVerified };
}
