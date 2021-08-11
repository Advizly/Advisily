const auth = require("../middleware/auth");
const Joi = require("joi");

const express = require("express");
const router = express.Router();
router.use(auth);

const { getConnection } = require("../utils/mysqlUtils");

const baseQuery =
  "SELECT sm.*,s.*,m.*,d.department_id, d.prefix,d.title AS department_title \
            FROM student_majors AS sm \
                    INNER JOIN students AS s ON (s.student_id=sm.student_id)\
                    INNER JOIN majors AS m ON (m.major_id=sm.major_id)\
                    INNER JOIN departments AS d ON (m.department_id=d.department_id)";

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
  const query = baseQuery + " WHERE sm.student_id=?";
  connection.query(query, [req.params.student_id], (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

router.post("/", (req, res) => {
  const student_major = {
    student_id: req.user.studentId,
    major_id: req.body.majorId,
    catalog_id: req.body.catalogId,
  };
  const { error } = validateStudentMajor(student_major);
  if (error) return res.status(400).send(error);

  const connection = getConnection();
  const query = "INSERT INTO student_majors SET ?";

  connection.query(query, student_major, (err, results) => {
    console.log("reached query");
    if (err) res.status(404).send(err);

    res.send(results);
  });
  connection.end();
});

router.delete("/", (req, res) => {
  const student_major = {
    student_id: req.user.studentId,
    major_id: req.body.majorId,
    catalog_id: req.body.catalogId,
  };
  const { error } = validateStudentMajor(student_major);
  if (error) return res.status(400).send(error);

  const connection = getConnection();
  const query = "DELETE FROM student_majors WHERE student_id=? AND major_id=?";

  connection.query(
    query,
    [student_major.student_id, student_major.major_id],
    (err, results) => {
      if (err) res.status(404).send(err);

      res.send(results);
    }
  );
  connection.end();
});

const validateStudentMajor = (student_major) => {
  const schema = Joi.object({
    student_id: Joi.number().integer().required().positive(),
    major_id: Joi.number().integer().required().positive(),
    catalog_id: Joi.number().integer().positive(),
  });
  return schema.validate(student_major);
};

module.exports = router;
