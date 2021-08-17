const express = require("express");
const router = express.Router();

const { getConnection } = require("../utils/mysqlUtils");

const baseQuery = "select * from catalogs";

router.get("/", (req, res) => {
  const connection = getConnection();
  const query = baseQuery;
  connection.query(query, (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

router.get("/:catalogId", (req, res) => {
  const connection = getConnection();
  const { catalogId } = req.params;
  const query = baseQuery + " where catalogId=?";
  connection.query(query, [catalogId], (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

module.exports = router;
