const auth = require("../middleware/auth");
const Joi = require("joi");
const _ = require("lodash");

const express = require("express");
const router = express.Router();

const { getConnection } = require("../helpers/mysql");

const baseQuery = "select DISTINCT * from userMajors";

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
  const userMajor = _.pick(req.body, ["studentId", "majorId", "catalogId"]);

  const { error } = validateStudentMajor(userMajor);
  if (error) return res.status(400).send(error);

  const connection = getConnection();
  const query = "INSERT IGNORE INTO userMajors SET ?";

  connection.query(query, userMajor, (err, results) => {
    if (err) res.status(404).send(err);

    res.send(results);
  });
  connection.end();
});

router.delete("/", auth, (req, res) => {
  const userMajor = _.pick(req.body, ["studentId", "majorId", "catalogId"]);

  const { error } = validateStudentMajor(userMajor);
  if (error) return res.status(400).send(error);

  const connection = getConnection();
  const query = "DELETE FROM userMajors WHERE studentId=? AND majorId=?";

  connection.query(
    query,
    [userMajor.studentId, userMajor.majorId],
    (err, results) => {
      if (err) res.status(404).send(err);

      res.send(results);
    }
  );
  connection.end();
});

const validateStudentMajor = (studentMajor) => {
  const schema = Joi.object({
    studentId: Joi.number().integer().required().positive(),
    majorId: Joi.number().integer().required().positive(),
    catalogId: Joi.number().integer().positive(),
  });
  return schema.validate(studentMajor);
};

module.exports = router;
