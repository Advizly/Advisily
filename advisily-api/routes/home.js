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
    "select c.course_code, c.title, c.department_id, semester_number,catalog_year,d.prefix\
	    	from plan_courses AS pc JOIN courses AS c \
        ON (pc.course_code=c.course_code AND pc.course_department_id=c.department_id)\
        JOIN departments as d ON(c.department_id=d.department_id) \
        WHERE  catalog_year= ?\
        ORDER BY semester_number ";
  connection.query(query, [2021], (err, results, fields) => {
    if (err) {
      console.log("Error in quyring data", err);
      return res.send("Error");
    }
    results.forEach((r, index, arr) => {
      arr[index] = r.course_code < 0 ? { ...r, course_code: "XXX" } : r;
      console.log("R is:", arr[index]);
    });
    res.send(results);
    // console.log(results);
    connection.end();
  });
});

module.exports = router;
