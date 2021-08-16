const bcrypt = require("bcrypt");
const Joi = require("joi");
const { JoiPassword } = require("joi-password");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

const generateToken = require("../utils/tokenGenerator");
const { getConnection } = require("../utils/mysqlUtils");

/* Nested routes*/
const studentMinors = require("./student_minors");
const studentMajors = require("./student_majors");
const studentCourses = require("./student_courses");

router.use("/student_minors", studentMinors);
router.use("/student_majors", studentMajors);
router.use("/student_courses", studentCourses);

/************************************************************
                GET with student_id
************************************************************/

router.get("/", (req, res) => {
  const connection = getConnection();
  const query = "SELECT * FROM students";
  connection.query(query, (err, results) => {
    if (err) return res.status(400).send(err);
    res.send(results);
  });

  connection.end();
});

router.get("/:student_id", (req, res) => {
  const connection = getConnection();
  const query = "SELECT * FROM students WHERE student_id=?";
  connection.query(query, [req.params.student_id], (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

router.post("/", async (req, res) => {
  const { error } = validateStudent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = {
    student_id: req.body.studentId,
    fname: req.body.firstName,
    lname: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(req.body.password, salt);

  const connection = getConnection();
  const studentQuery = "INSERT INTO students SET ?";
  const getStudentQuery =
    "SELECT student_id,fname, lname, email from students WHERE student_id=? ";

  connection.query(studentQuery, [student], (err, results) => {
    if (err) {
      return res.status(400).send(err);
    }

    const {
      fname: firstName,
      lname: lastName,
      student_id: studentId,
      email,
    } = student;
    const token = generateToken({ firstName, lastName, studentId, email });
    connection.query(getStudentQuery, [student.student_id], (err, student) => {
      console.log(student);
      res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(student);
    });
  });
});

const validateStudent = (student) => {
  const schema = Joi.object({
    studentId: Joi.number().positive().integer().required(),
    firstName: Joi.string().alphanum().min(1).max(30).required(),
    lastName: Joi.string().alphanum().min(1).max(30).required(),
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

  return schema.validate(student);
};
module.exports = router;
