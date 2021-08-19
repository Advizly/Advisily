const bcrypt = require("bcrypt");
const Joi = require("joi");
const { JoiPassword } = require("joi-password");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const config = require("config");
const hostUrl = config.get("hostUrl");
const frontendUrl = config.get("frontendUrl");

const generateToken = require("../utils/tokenGenerator");
const { getConnection } = require("../utils/mysqlUtils");
const sendEmail = require("../utils/sendEmail");

/* Nested routes*/
const userMinors = require("./user_minors");
const userMajors = require("./user_majors");
const userCourses = require("./user_courses");

router.use("/user_minors", userMinors);
router.use("/user_majors", userMajors);
router.use("/user_courses", userCourses);

const baseSelectQuery =
  "SELECT studentId,firstName, lastName, email, isVerified FROM users";
const baseUpdateQuery = "UPDATE users SET ?";

router.get("/", (req, res) => {
  const connection = getConnection();
  const query = baseSelectQuery;
  connection.query(query, (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });

  connection.end();
});

router.get("/verify-email", (req, res) => {
  const { token } = req.query;
  console.log(token);

  const { error } = validateToken({ token });
  if (error) return res.status(400).send(error.details[0].message);

  const connection = getConnection();
  const getUserQuery = baseSelectQuery + " WHERE verificationToken = ? ";
  const updateStudentQuery = baseUpdateQuery + " WHERE email=?";
  connection.query(getUserQuery, [token], (err, results) => {
    if (err) return res.status(400).send(err);

    if (results.length === 0) return res.status(404).send("User not found");

    const user = results[0];
    user.isVerified = true;
    // user.verificationToken = null;
    connection.query(updateStudentQuery, [user, user.email], (err, results) => {
      if (err) return res.status(400).send(err);
      return res.redirect("http://localhost:3000/login");
    });
  });
});

router.post("/reset-password", (req, res) => {
  const { token, password } = req.body;

  const { error } = validatePasswordReset({ token, password });
  if (error) res.status(400).send(error.details[0].message);

  const getStudentQuery =
    baseSelectQuery +
    " WHERE passwordResetToken=? AND resetTokenExpires >= NOW()";

  const updateStudentQuery = baseUpdateQuery + " WHERE email=?";
  const connection = getConnection();
  connection.query(getStudentQuery, [token], async (err, results) => {
    if (err) return res.status(400).send(err);
    if (!results.length)
      return res.status(400).send("Invalid password reset token");
    const user = results[0];

    user.password = await hash(password);
    user.passwordResetToken = null;
    user.resetTokenExpires = null;

    connection.query(updateStudentQuery, [user, user.email], (err, results) => {
      if (err) return res.status(400).send(err);
      return res.send(user);
    });
  });
});

router.post("/validate-reset-token", (req, res) => {
  const { token } = req.body;

  const { error } = validateToken({ token });
  if (error) return res.status(400).send(error.details[0].message);

  const getStudentQuery =
    baseSelectQuery +
    " WHERE passwordResetToken=? AND resetTokenExpires >= NOW()";
  const connection = getConnection();
  connection.query(getStudentQuery, [token], (err, results) => {
    if (err) return res.status(400).send(err);
    if (!results.length)
      return res.status(400).send("Invalid password reset token");
    const user = results[0];
    console.log("Valid token for user: ", user);
    return res.send(user);
  });
});

router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) res.status(400).send("Email is required");

  const getStudentQuery = baseSelectQuery + " WHERE email=?";
  const updateStudentQuery = baseUpdateQuery + " WHERE email=?";
  const connection = getConnection();
  connection.query(getStudentQuery, [email], (err, results) => {
    if (err) return res.status(400).send(err);
    if (!results.length)
      return res.status(400).send("Invalid email, user not found.");

    const user = results[0];
    user.passwordResetToken = getRandomToken();
    user.resetTokenExpires = new Date(Date.now() + 24 * 3600 * 1000); //expires in 24 hours
    connection.query(updateStudentQuery, [user, email], (err, results) => {
      if (err) return res.status(400).send(err);

      sendForgotPasswordEmail(user);
      return res.send(
        "We sent you email with the instructions to reset your password."
      );
    });
  });
});

router.get("/:studentId", (req, res) => {
  const connection = getConnection();
  const query = baseSelectQuery + " WHERE studentId= ?";
  connection.query(query, [req.params.studentId], (err, results) => {
    if (err) return res.status(400).send(err);
    if (!results.length) res.status(404).send("User not found");

    const authToken = generateToken(results[0]);
    res
      .header("x-auth-token", authToken)
      .header("access-control-expose-headers", "x-auth-token")
      .send(results);
  });
  connection.end();
});

router.post("/", async (req, res) => {
  let user = _.pick(req.body, [
    "studentId",
    "firstName",
    "lastName",
    "email",
    "password",
    "repeatPassword",
  ]);

  const { error } = validateUser(user);
  if (error) return res.status(400).send(error.details[0].message);

  user.password = await hash(user.password);

  user = _.omit(user, ["repeatPassword"]);
  user.isVerified = false;
  user.verificationToken = getRandomToken();

  const connection = getConnection();
  const studentQuery = "INSERT INTO users SET ?";
  const getStudentQuery = baseSelectQuery + " WHERE studentId=? ";

  connection.query(studentQuery, [user], (err, results) => {
    if (err) return res.status(400).send(err);

    sendVerificationEmail(user);
    const authToken = generateToken(user);

    connection.query(getStudentQuery, [user.studentId], (err, insertedUser) => {
      res
        .header("x-auth-token", authToken)
        .header("access-control-expose-headers", "x-auth-token")
        .send(insertedUser);
    });
  });
});

const sendVerificationEmail = (user) => {
  const verifyUrl = `${hostUrl}/api/users/verify-email?token=${user.verificationToken}`;
  let msg = `<p>Please click <a href=${verifyUrl}>here<a/> to verify your email address</p>`;

  sendEmail({
    to: user.email,
    subject: "Advisily -- Email Verification",
    html: `<p>Almost done!.<p/><br/> 
          <p>${user.firstName}, you are one step away from meeting your new advisor.<p/>
    ${msg}`,
  });
};

const sendForgotPasswordEmail = (user) => {
  const verifyUrl = `${frontendUrl}/reset-password?token=${user.passwordResetToken}`;
  let msg = `<p>Please click <a href=${verifyUrl}>here<a/> to reset your password. This link will expire in 24 hours</p>`;

  sendEmail({
    to: user.email,
    subject: "Advisily -- Password Reset",
    html: `${msg}`,
  });
};

const getRandomToken = () => {
  return crypto.randomBytes(40).toString("hex");
};
const hash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const validatePasswordReset = ({ token, password }) => {
  const schema = Joi.object({
    token: Joi.string().required(),
    password: JoiPassword.string()
      .min(8)
      .max(30)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .pattern(new RegExp("^.*[a-zA-Z]+.*$"))
      .required(),
  });
  return schema.validate({ token, password });
};

const validateToken = (token) => {
  const schema = Joi.object({
    token: Joi.string().required(),
  });
  return schema.validate(token);
};

const validateUser = (user) => {
  const schema = Joi.object({
    studentId: Joi.number().positive().integer().required().label("Student ID"),
    firstName: Joi.string()
      .alphanum()
      .min(1)
      .max(30)
      .required()
      .label("First Name"),
    lastName: Joi.string()
      .alphanum()
      .min(1)
      .max(30)
      .required()
      .label("Last Name"),
    password: JoiPassword.string()
      .min(8)
      .max(30)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .pattern(new RegExp("^.*[a-zA-Z]+.*$"))
      .required(),
    repeatPassword: Joi.ref("password"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["edu"] } })
      .required(),
  });

  return schema.validate(user);
};
module.exports = router;
