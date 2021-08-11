const express = require("express");

const router = express.Router();

const { getConnection } = require("../utils/mysqlUtils");

router.get("/", (req, res) => {
  const connection = getConnection();
  const query =
    "select c.title,c.course_id,d.prefix,c.course_code\
     FROM courses as c JOIN departments as d\
     ON c.department_id=d.department_id";
  connection.query(query, (err, results) => {
    if (err) res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

router.get("/:course_id", (req, res) => {
  const connection = getConnection();
  const { course_id } = req.params;
  const query =
    "SELECT c.title,c.course_id,d.prefix,c.course_code\
     FROM courses as c JOIN departments as d\
     ON c.department_id=d.department_id\
     WHERE course_id=?";
  connection.query(query, [course_id], (err, results) => {
    if (err) res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

module.exports = router;
