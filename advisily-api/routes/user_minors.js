const auth = require("../middleware/auth");
const Joi = require("joi");
const _ = require("lodash");

const express = require("express");
const router = express.Router();
// router.use(auth);

const { getConnection } = require("../utils/mysqlUtils");

const baseQuery = "SELECT DISTINCT * from userMinors";

router.get("/:studentId", auth, (req, res) => {
  const connection = getConnection();
  const query = baseQuery + " WHERE studentId=?";
  connection.query(query, [req.params.studentId], (err, results) => {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
  connection.end();
});

router.post("/", auth, (req, res) => {
  const userMinor = _.pick(req.body, ["studentId", "minorId", "catalogId"]);

  const { error } = validateStudentMinor(userMinor);
  if (error) return res.status(400).send(error);

  const connection = getConnection();
  const query = "INSERT IGNORE INTO userMinors SET ?";

  connection.query(query, userMinor, (err, results) => {
    if (err) res.status(404).send(err);

    res.send(results);
  });
  connection.end();
});

router.delete("/", auth, (req, res) => {
  const userMinor = _.pick(req.body, ["studentId", "minorId", "catalogId"]);

  const { error } = validateStudentMinor(userMinor);
  if (error) return res.status(400).send(error);

  const connection = getConnection();
  const query = "DELETE FROM userMinors WHERE studentId=? AND minorId =?";
  connection.query(
    query,
    [userMinor.studentId, userMinor.minorId],
    (err, results) => {
      if (err) res.status(404).send(err);

      res.send(results);
    }
  );
  connection.end();
});

const validateStudentMinor = (minorCourse) => {
  const schema = Joi.object({
    studentId: Joi.number().integer().required().positive(),
    minorId: Joi.number().integer().required().positive(),
    catalogId: Joi.number().integer().positive().allow(null),
  });
  return schema.validate(minorCourse);
};

module.exports = router;
