const express = require("express");

const router = express.Router();

const { getConnection } = require("../utils/mysqlUtils");

router.get("/", (req, res) => {
  const connection = getConnection();
  const query =
    "select c.title,c.course_code,d.prefix,c.course_id,d.department_id FROM catalog_courses as cc \
    INNER JOIN courses as c ON cc.course_id=c.course_id \
    INNER JOIN departments as d ON d.department_id=c.department_id\
    ";
  connection.query(query, [], (err, results) => {
    if (err) {
      console.log("Error in quyring data", err);
      return res.send("Error");
    }
    res.send(results);
  });
  connection.end();
});

router.get("/:catalog_id", (req, res) => {
  const connection = getConnection();
  const { catalog_id } = req.params;
  const query =
    "select c.title,c.course_code,d.prefix,c.course_id,d.department_id FROM catalog_courses as cc \
    INNER JOIN courses as c ON cc.course_id=c.course_id \
    INNER JOIN departments as d ON d.department_id=c.department_id\
     where catalog_id=? ";
  connection.query(query, [catalog_id], (err, results) => {
    if (err) {
      console.log("Error in quyring data", err);
      return res.send("Error");
    }
    res.send(results);
  });
  connection.end();
});

router.get("/:catalog_id/:course_type_id", (req, res) => {
  const connection = getConnection();
  const { catalog_id, course_type_id } = req.params;
  const query =
    "select c.title,c.course_code,d.prefix,c.course_id,d.department_id FROM catalog_courses as cc \
    INNER JOIN courses as c ON cc.course_id=c.course_id \
    INNER JOIN departments as d ON d.department_id=c.department_id\
     where catalog_id=? AND course_type_id=?";
  connection.query(query, [catalog_id, course_type_id], (err, results) => {
    if (err) {
      console.log("Error in quyring data", err);
      return res.send("Error");
    }
    res.send(results);
  });
  connection.end();
});

module.exports = router;
