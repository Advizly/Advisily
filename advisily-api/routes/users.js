const bcrypt = require("bcrypt");
const Joi = require("joi");
const { JoiPassword } = require("joi-password");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

const generateToken = require("../utils/tokenGenerator");
const { getConnection } = require("../utils/mysqlUtils");

/* Nested routes*/
const userMinors = require("./user_minors");
const userMajors = require("./user_majors");
const userCourses = require("./user_courses");

router.use("/user_minors", userMinors);
router.use("/user_majors", userMajors);
router.use("/user_courses", userCourses);

/************************************************************
                GET with student_id
************************************************************/

router.get("/", (req, res) => {
  const connection = getConnection();
  const query = "SELECT * FROM users";
  connection.query(query, (err, results) => {
    if (err) return res.status(400).send(err);
    res.send(results);
  });

  connection.end();
});

router.get("/:studentId", (req, res) => {
  const connection = getConnection();
  const query = "SELECT * FROM users WHERE studentId= ?";
  connection.query(query, [req.params.studentId], (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
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

  const { error } = validateStudent(user);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = _.omit(user, ["repeatPassword"]);

  const connection = getConnection();
  const studentQuery = "INSERT INTO users SET ?";
  const getStudentQuery =
    "SELECT studentId,firstName, lastName, email FROM users WHERE studentId=? ";

  connection.query(studentQuery, [user], (err, results) => {
    if (err) {
      return res.status(400).send(err);
    }

    const { firstName, lastName, studentId, email } = user;
    const token = generateToken({ firstName, lastName, studentId, email });
    connection.query(getStudentQuery, [user.studentId], (err, insertedUser) => {
      res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(insertedUser);
    });
  });
});

const validateStudent = (user) => {
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
