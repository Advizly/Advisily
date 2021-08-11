const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const Joi = require("joi");
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

router.post("/", auth, async (req, res) => {
  const { error } = validateStudent(req.body);
  if (error) return res.send(error.details[0].message);

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
  const query = "INSERT INTO students SET ?";
  connection.query(query, [student], (err, results) => {
    if (err) res.status(404).send(err);

    const token = generateToken({ student_id: student.student_id });
    res.header("x-auth-token", token).send(results);
  });
  connection.end();
});

const validateStudent = (student) => {
  const schema = Joi.object({
    studentId: Joi.number().positive().integer().required(),
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
    passwordConfirmation: Joi.ref("password"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["edu"] } })
      .required(),
  });

  return schema.validate(student);
};
module.exports = router;
