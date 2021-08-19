require("dotenv").config();
const privateKey = require("config").get("jwtPrivateKey");
const jwt = require("jsonwebtoken");

module.exports = (user) => {
  const { firstName, lastName, studentId, email, isVerified } = user;
  return jwt.sign(
    {
      firstName,
      lastName,
      studentId,
      email,
      isVerified,
    },
    privateKey
  );
};
