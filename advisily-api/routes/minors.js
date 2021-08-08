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
  const query = "SELECT * FROM minors";
  connection.query(query, (err, results) => {
    if (err) {
      console.log("Error querying minors: ", err);
      return res.send("Error getting minors");
    }
    res.send(results);
  });
  connection.end();
});

router.get("/:minor_id", (req, res) => {
  const connection = getConnection();
  const { minor_id } = req.params;
  const query = "SELECT * FROM minors WHERE minor_id=?";
  connection.query(query, [minor_id], (err, results) => {
    if (err) {
      console.log("Error querying minors: ", err);
      return res.send("Error getting minors");
    }
    res.send(results);
  });
  connection.end();
});

module.exports = router;
