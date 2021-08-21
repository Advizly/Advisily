const express = require("express");
const router = express.Router();

const { getConnection } = require("../helpers/mysql");

const baseQuery = "SELECT * FROM minors";

router.get("/", (req, res) => {
  const connection = getConnection();
  const query = baseQuery;
  connection.query(query, (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

router.get("/:minorId", (req, res) => {
  const connection = getConnection();
  const { minorId } = req.params;
  const query = baseQuery + " WHERE minorId=?";
  connection.query(query, [minorId], (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

module.exports = router;
