const express = require("express");

const router = express.Router();

const { getConnection } = require("../utils/mysqlUtils");

const baseQuery =
  "SELECT c.courseTitle,c.courseId,d.prefix,c.courseCode\
     FROM courses as c JOIN departments as d\
     ON c.departmentId=d.departmentId";

router.get("/", (req, res) => {
  const connection = getConnection();
  const query = baseQuery;
  connection.query(query, (err, results) => {
    if (err) res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

router.get("/:courseId", (req, res) => {
  const connection = getConnection();
  const { courseId } = req.params;
  const query = baseQuery + " WHERE courseId=?";
  connection.query(query, [courseId], (err, results) => {
    if (err) res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

module.exports = router;
