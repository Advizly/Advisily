const mysql = require("mysql");
const express = require("express");
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
  const query = "SELECT * FROM majors";

  connection.query(query, (err, results) => {
    if (err) {
      console.log("ERROR queyring data: ", err);
      return res.send("Error");
    }
    res.send(results);
  });
  connection.end();
});

module.exports = router;
