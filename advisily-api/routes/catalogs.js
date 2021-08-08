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
  const query = "select * from catalogs";
  connection.query(query, (err, results) => {
    if (err) {
      console.log("Error in quyring data", err);
      return res.send("Error");
    }

    res.send(results);
    connection.end();
  });
});

router.get("/:catalog_id", (req, res) => {
  const connection = getConnection();
  const { catalog_id } = req.params;
  const query = "select * from catalogs where catalog_id=?";
  connection.query(query, [catalog_id], (err, results) => {
    if (err) {
      console.log("Error in quyring data", err);
      return res.send("Error");
    }

    res.send(results);
    connection.end();
  });
});

module.exports = router;
