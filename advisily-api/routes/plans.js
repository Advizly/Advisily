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

router.get("/:major_id/:catalog_year", (req, res) => {
  const connection = getConnection();
  const { major_id, catalog_year } = req.params;
  const query = "CALL GetPlanCourses(1,2020) ";
  connection.query(query, [major_id, catalog_year], (err, results, fields) => {
    if (err) {
      console.log("Error in quyring data", err);
      return res.send("Error");
    }
    // results[0].forEach((r, index, arr) => {
    //   arr[index] = r.course_code < 0 ? { ...r, course_code: "XXX" } : r;
    // });
    res.send(results[0]);
    // console.log(results);
    connection.end();
  });
});

module.exports = router;
