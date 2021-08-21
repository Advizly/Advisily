const express = require("express");
const router = express.Router();

const { getConnection } = require("../helpers/mysql");

const baseQuery = "SELECT * FROM majors ";
router.get("/", (req, res) => {
  const connection = getConnection();
  const query = baseQuery;

  connection.query(query, (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});
router.get("/:major_id", (req, res) => {
  const connection = getConnection();
  const query = baseQuery + " WHERE majorId=?";

  connection.query(query, [req.params.major_id], (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

module.exports = router;
