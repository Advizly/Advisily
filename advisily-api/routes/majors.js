const express = require("express");
const router = express.Router();

const { getConnection } = require("../utils/mysqlUtils");

router.get("/", (req, res) => {
  const connection = getConnection();
  const query = "SELECT * FROM majors";

  connection.query(query, (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});
router.get("/:major_id", (req, res) => {
  const connection = getConnection();
  const query = "SELECT * FROM majors WHERE major_id=?";

  connection.query(query, [req.body.major_id], (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

module.exports = router;
