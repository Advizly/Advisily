const express = require("express");

const router = express.Router();

const { getConnection } = require("../utils/mysqlUtils");

router.get("/", (req, res) => {
  const connection = getConnection();
  const query = "select * from catalogs";
  connection.query(query, (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

router.get("/:catalog_id", (req, res) => {
  const connection = getConnection();
  const { catalog_id } = req.params;
  const query = "select * from catalogs where catalog_id=?";
  connection.query(query, [catalog_id], (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

module.exports = router;
