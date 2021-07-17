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
  connection.query("SELECT * FROM template_courses", (err, results, fields) => {
    if (err) {
      console.log("Error in quyring data", err);
      return res.send("Error");
    }
    res.send(results);
    console.log(results);
    connection.end();
  });
});

module.exports = router;
