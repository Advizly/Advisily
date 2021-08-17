const express = require("express");

const router = express.Router();

const { getConnection } = require("../utils/mysqlUtils");

const baseQuery =
  "SELECT c.courseTitle,c.courseCode,d.prefix,c.courseId,d.departmentId FROM catalogCourses as cc \
    INNER JOIN courses as c ON cc.courseId=c.courseId \
    INNER JOIN departments as d ON d.departmentId=c.departmentId";

router.get("/", (req, res) => {
  const connection = getConnection();
  const query = baseQuery;
  connection.query(query, [], (err, results) => {
    if (err) {
      console.log("Error in quyring data", err);
      return res.send("Error");
    }
    res.send(results);
  });
  connection.end();
});

router.get("/:catalogId", (req, res) => {
  const connection = getConnection();
  const { catalogId } = req.params;
  const query = baseQuery + " WHERE catalogId=? ";
  connection.query(query, [catalogId], (err, results) => {
    if (err) {
      console.log("Error in quyring data", err);
      return res.send("Error");
    }
    res.send(results);
  });
  connection.end();
});

router.get("/:catalogId/:courseTypeId", (req, res) => {
  const connection = getConnection();
  const { catalogId, courseTypeId } = req.params;
  const query = baseQuery + " where catalogId=? AND courseTypeId=?";
  connection.query(query, [catalogId, courseTypeId], (err, results) => {
    if (err) {
      console.log("Error in quyring data", err);
      return res.send("Error");
    }
    res.send(results);
  });
  connection.end();
});

module.exports = router;
