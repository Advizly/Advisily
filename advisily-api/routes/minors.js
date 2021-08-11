const express = require("express");
const router = express.Router();

const { getConnection } = require("../utils/mysqlUtils");

router.get("/", (req, res) => {
  const connection = getConnection();
  const query = "SELECT * FROM minors";
  connection.query(query, (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

router.get("/:minor_id", (req, res) => {
  const connection = getConnection();
  const { minor_id } = req.params;
  const query = "SELECT * FROM minors WHERE minor_id=?";
  connection.query(query, [minor_id], (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

module.exports = router;
