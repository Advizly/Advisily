const auth = require("../middleware/auth");
const Joi = require("joi");
const _ = require("lodash");

const express = require("express");
const router = express.Router();
// router.use(auth);

const { getConnection } = require("../utils/mysqlUtils");

const baseQuery = "SELECT DISTINCT * from userCourses";

router.get("/:studentId", auth, (req, res) => {
  const connection = getConnection();
  const query = baseQuery + " WHERE studentId=?";
  connection.query(query, [req.params.studentId], (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

router.post("/", auth, (req, res) => {
  const connection = getConnection();
  const userCourse = _.pick(req.body, ["studentId", "courseId"]);

  const { error } = validateStudentCourse(userCourse);
  if (error) {
    console.log(error.deails, req.body, req.body.data);
    return res.status(400).send(error);
  }

  const query = "INSERT IGNORE INTO userCourses SET ?";
  connection.query(query, userCourse, (err, results) => {
    if (err) res.status(404).send(err);

    res.send(results);
  });
  connection.end();
});

router.delete("/", auth, (req, res) => {
  const userCourse = _.pick(req.body, ["studentId", "courseId"]);

  const { error } = validateStudentCourse(userCourse);
  if (error) return res.status(400).send(error);

  const connection = getConnection();
  const query = "DELETE FROM userCourses WHERE studentId= ? AND courseId=?";

  connection.query(
    query,
    [userCourse.studentId, userCourse.courseId],
    (err, results) => {
      if (err) res.status(404).send(err);

      res.send(results);
    }
  );
  connection.end();
});

const validateStudentCourse = (userCourse) => {
  const schema = Joi.object({
    studentId: Joi.number().integer().required().positive(),
    courseId: Joi.number().integer().required().positive(),
  });
  return schema.validate(userCourse);
};
module.exports = router;
