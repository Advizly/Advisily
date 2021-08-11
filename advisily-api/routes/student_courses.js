const auth = require("../middleware/auth");
const Joi = require("joi");

const express = require("express");
const router = express.Router();
router.use(auth);

const { getConnection } = require("../utils/mysqlUtils");

const baseQuery =
  " SELECT sc.*,s.*,c.*,d.department_id, d.prefix,d.title AS department_title\
                             FROM student_courses AS sc\
                             INNER JOIN students AS s ON (s.student_id=sc.student_id)\
                             INNER JOIN courses AS c ON (c.course_id=sc.course_id)\
                             INNER JOIN departments AS d ON (d.department_id=c.department_id)";
/************************************************************
                GET with student_id
************************************************************/

router.get("/", (req, res) => {
  const connection = getConnection();
  const query = baseQuery;

  connection.query(query, (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });

  connection.end();
});

router.get("/:student_id", (req, res) => {
  const connection = getConnection();
  const query = baseQuery + " WHERE sc.student_id=?";
  connection.query(query, [req.params.student_id], (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

router.post("/", (req, res) => {
  const connection = getConnection();
  const query = "INSERT INTO student_courses SET ?";
  const student_course = {
    student_id: req.user.studentId,
    course_id: req.body.courseId,
  };
  const { error } = validateStudentCourse(student_minor);
  if (error) return res.status(400).send(error);

  connection.query(query, student_course, (err, results) => {
    if (err) res.status(404).send(err);

    res.send(results);
  });
  connection.end();
});
router.delete("/", (req, res) => {
  const student_course = {
    student_id: req.user.studentId,
    course_id: req.body.courseId,
  };
  const { error } = validateStudentCourse(student_minor);
  if (error) return res.status(400).send(error);

  const connection = getConnection();
  const query =
    "DELETE FROM student_courses WHERE student_id= ? AND course_id=?";

  connection.query(
    query,
    [student_course.student_id, student_course.course_id],
    (err, results) => {
      if (err) res.status(404).send(err);

      res.send(results);
    }
  );
  connection.end();
});

const validateStudentCourse = (studentCourse) => {
  const schema = Joi.object({
    student_id: Joi.number().integer().required().positive(),
    course_id: Joi.number().integer().required().positive(),
  });
  return schema.validate(studentCourse);
};
module.exports = router;
