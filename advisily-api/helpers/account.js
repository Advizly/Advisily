require("dotenv").config();
const privateKey = require("config").get("jwtPrivateKey");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const _ = require("lodash");

module.exports = {
  getAuthToken,
  getRandomToken,
  hash,
  basicInfo,
  removeSensitive,
};
function getAuthToken(user) {
  return jwt.sign(basicInfo(user), privateKey, {expiresIn: "2h"});
}

async function getRandomToken() {
  return crypto.randomBytes(40).toString("hex");
}

async function hash(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

function basicInfo(user) {
  return _.pick(user, [
    "firstName",
    "lastName",
    "userId",
    "email",
    "isVerified",
    "advisingSessionId",
    "standingId",
    "standing",
    "semesterNumber",
    "isAdmin",
  ]);
}
//similar to basicInfo but removes instead of picks...
//... used in getting all results
function removeSensitive(user) {
  return _.omit(user, [
    "password",
    "verificationToken",
    "passwordResetToken",
    "resetTokenExpire",
  ]);
}
