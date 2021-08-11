const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const generateToken = require("../utils/tokenGenerator");
const { getConnection, getPool } = require("../utils/mysqlUtils");

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
  if (error) return res.send(error.details[0].message);

  const { studentId: student_id } = req.body;
  const student = {
    student_id,
    fname: req.body.firstName,
    lname: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  const majorInfo = {
    student_id,
    major_id: req.body.majorId,
    catalog_id: req.body.catalogId,
  };
  const secondMajorInfo = {
    student_id,
    major_id: req.body.secondMajorId,
    catalog_id: req.body.secondCatalogId,
  };

  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(req.body.password, salt);

  const connection = getConnection();
  const studentQuery = "INSERT INTO students SET ?";

  let token;

  connection.query(studentQuery, [student], (err, studentRows) => {
    if (err) {
      res.status(400).send(err);
      throw err;
    }

    token = generateToken({ student_id: student.student_id });

    const majorQuery = "INSERT INTO student_majors SET ?";
    connection.query(majorQuery, majorInfo, (err, results) => {
      if (err) {
        res.status(400).send(err);
        throw err;
      }

      if (secondMajorInfo.major_id)
        connection.query(majorQuery, secondMajorInfo, (err, results) => {
          if (err) {
            res.status(400).send(err);
            throw err;
          }
        });

      const minorIds = req.body.minorIds;
      const minorQuery = "INSERT INTO student_minors SET ?";
      if (minorIds && minorIds.length)
        minorIds.forEach((minor_id) => {
          options = {
            student_id: student.student_id,
            minor_id,
          };
          connection.query(minorQuery, options, (err, results) => {
            if (err) {
              res.status(400).send(err);
              throw err;
            }
          });
        });
    });

    res.send(studentRows);
  });
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
    majorId: Joi.number().positive().integer().required(),
    catalogId: Joi.number().positive().integer().required(),
    secondMajorId: Joi.number().positive().integer(),
    secondCatalogId: Joi.number()
      .positive()
      .integer()
      .when("secondMajorId", { is: Joi.exist(), then: Joi.required() }),
    minorIds: Joi.array().items(Joi.number().positive().integer()),
  });

  return schema.validate(student);
};
module.exports = router;
