const auth = require("../middleware/auth");
const Joi = require("joi");

const express = require("express");
const router = express.Router();
// router.use(auth);

const { getConnection } = require("../utils/mysqlUtils");

const baseQuery = "SELECT DISTINCT * from student_minors";

// const baseQuery =
//   "SELECT sm.*,s.*,m.*,d.department_id, d.prefix,d.title AS department_title \
//             FROM student_minors AS sm \
//                     INNER JOIN students AS s ON (s.student_id=sm.student_id)\
//                     INNER JOIN minors AS m ON (m.minor_id=sm.minor_id)\
//                     INNER JOIN departments AS d ON (m.department_id=d.department_id)";
// router.get("/", (req, res) => {
//   const connection = getConnection();
//   const query = baseQuery;
//   connection.query(query, (err, results) => {
//     if (err) return res.status(400).send(err);

//     res.send(results);
//   });
//   connection.end();
// });

router.get("/:student_id", auth, (req, res) => {
  const connection = getConnection();
  const query = baseQuery + " WHERE student_id=?";
  connection.query(query, [req.params.student_id], (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

router.post("/", auth, (req, res) => {
  const student_minor = {
    student_id: req.user.studentId,
    minor_id: req.body.minorId,
    catalog_id: req.body.catalogId,
  };
  const { error } = validateStudentMinor(student_minor);
  if (error) return res.status(400).send(error);

  const connection = getConnection();
  const query = "INSERT IGNORE INTO student_minors SET ?";

  connection.query(query, student_minor, (err, results) => {
    if (err) res.status(404).send(err);

    res.send(results);
  });
  connection.end();
});

router.delete("/", auth, (req, res) => {
  const student_minor = {
    student_id: req.user.studentId,
    minor_id: req.body.minorId,
    catalog_id: req.body.catalogId,
  };
  const { error } = validateStudentMinor(student_minor);
  if (error) return res.status(400).send(error);

  const connection = getConnection();
  const query = "DELETE FROM student_minors WHERE student_id=? AND minor_id =?";
  connection.query(
    query,
    [student_minor.student_id, student_minor.minor_id],
    (err, results) => {
      if (err) res.status(404).send(err);

      res.send(results);
    }
  );
  connection.end();
});

const validateStudentMinor = (minorCourse) => {
  const schema = Joi.object({
    student_id: Joi.number().integer().required().positive(),
    minor_id: Joi.number().integer().required().positive(),
    catalog_id: Joi.number().integer().positive().allow(null),
  });
  return schema.validate(minorCourse);
};

module.exports = router;
