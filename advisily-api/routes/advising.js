const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();
const { getConnection } = require("../utils/mysqlUtils");

router.use(auth);

router.get("/", (req, res) => {
  const connection = getConnection();
  const query = "select * from advising_sessions";
  connection.query(query, (err, results) => {
    if (err) return res.send(err);

    res.send(results);
    connection.end();
  });
});
router.get("/:session_id", (req, res) => {
  const connection = getConnection();
  const query = "select * from advising_sessions WHERE advising_session_id=?";
  connection.query(query, [req.params.session_id], (err, results) => {
    if (err) return res.send(err);

    res.send(results);
    connection.end();
  });
});
router.get("/:session_id/results", (req, res) => {
  const connection = getConnection();
  const query =
    "select ac.*,c.*,d.prefix,d.department_id,d.title AS department_title from advising_courses AS ac \
                          INNER JOIN courses AS c ON (c.course_id=ac.course_id)\
                          INNER JOIN departments AS d ON (d.department_id=c.department_id)\
                         WHERE advising_session_id=?";
  connection.query(query, [req.params.session_id], (err, results) => {
    if (err) return res.send(err);

    res.send(results);
    connection.end();
  });
});

module.exports = router;
