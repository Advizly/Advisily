const express = require("express");
const mysql = require("mysql");
const router = express.Router();

const getConnection = () =>
  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "advisily",
  });

router.get("/", (req, res) => {
  const connection = getConnection();
  const query =
    "select c.title,c.course_id,d.prefix,c.course_code\
     FROM courses as c JOIN departments as d\
     ON c.department_id=d.department_id";
  connection.query(query, (err, results) => {
    if (err) {
      console.log("Error in quyring data", err);
      return res.send("Error");
    }

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
    if (err) {
      console.log("Error in quyring data", err);
      return res.send("Error");
    }

    res.send(results);
  });
  connection.end();
});

module.exports = router;
