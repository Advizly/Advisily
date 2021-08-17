const auth = require("../middleware/auth");
const Joi = require("joi");
const _ = require("lodash");

const express = require("express");
const router = express.Router();
const { getConnection } = require("../utils/mysqlUtils");

router.get("/", auth, (req, res) => {
  const connection = getConnection();
  const { studentId } = req.query;
  let query = "select * from advisingSessions ";
  if (studentId) query += "WHERE studentId=?";

  connection.query(query, [studentId], (err, results) => {
    if (err) return res.send(err);

    res.send(results);
    connection.end();
  });
});
router.get("/paces", (req, res) => {
  const connection = getConnection();
  const query = "select * from paces";
  connection.query(query, (err, results) => {
    if (err) return res.send(err);

    res.send(results);
    connection.end();
  });
});
router.get("/:sessionId", auth, (req, res) => {
  const connection = getConnection();
  const query = "select * from advisingSessions WHERE advisingSessionId=?";
  connection.query(query, [req.params.sessionId], (err, results) => {
    if (err) return res.send(err);

    res.send(results);
    connection.end();
  });
});
router.get("/:sessionId/results", auth, (req, res) => {
  const connection = getConnection();
  const query =
    "select * from advisingResultCourses AS arc \
                          INNER JOIN courses AS c ON (c.courseId=arc.courseId)\
                          INNER JOIN departments AS d ON (d.departmentId=c.departmentId)\
                         WHERE advisingSessionId=1";
  connection.query(query, [req.params.sessionId], (err, results) => {
    if (err) return res.send(err);

    res.send(results);
    connection.end();
  });
});

router.post("/", auth, (req, res) => {
  const connection = getConnection();
  const advisingData = _.pick(req.body, [
    "advisingSessionId",
    "studentId",
    "overloadingCredits",
    "summerCredits",
    "winterCredits",
    "paceId",
    "generalElecCredits",
    "semestersPlanned",
  ]);

  const { error } = validateAdvisingData(advisingData);
  if (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  const query = "INSERT INTO advisingSessions SET ?";
  connection.query(query, advisingData, (err, results) => {
    if (err) return res.send(err);

    res.send(results);
    connection.end();
  });
});

router.put("/", auth, (req, res) => {
  const connection = getConnection();

  const advisingData = _.pick(req.body, [
    "advisingSessionId",
    "studentId",
    "overloadingCredits",
    "summerCredits",
    "winterCredits",
    "paceId",
    "generalElecCredits",
    "semestersPlanned",
  ]);

  const { error } = validateAdvisingData(advisingData);
  if (error) res.status(400).send(error);

  console.log(advisingData);

  const {
    advisingSessionId,
    overloadingCredits,
    summerCredits,
    winterCredits,
    paceId,
    generalElecCredits,
    semestersPlanned,
  } = advisingData;

  const query =
    "UPDATE advisingSessions SET overloadingCredits=?, summerCredits=?,\
                                  winterCredits=?, paceId=?,\
                                  generalElecCredits=?, semestersPlanned=?\
                                  WHERE advisingSessionId=?";
  connection.query(
    query,
    [
      overloadingCredits,
      summerCredits,
      winterCredits,
      paceId,
      generalElecCredits,
      semestersPlanned,
      advisingSessionId,
    ],
    (err, results) => {
      if (err) return res.send(err);

      res.send(results);
      connection.end();
    }
  );
});

const validateAdvisingData = (advisingData) => {
  const schema = Joi.object({
    advisingSessionId: Joi.number().integer().positive(),
    studentId: Joi.number().integer().positive().required(),
    overloadingCredits: Joi.number().integer().min(0).required(),
    summerCredits: Joi.number().integer().max(7).min(0).required(),
    winterCredits: Joi.number().integer().max(4).min(0).required(),
    paceId: Joi.number().integer().positive().required(),
    generalElecCredits: Joi.number().integer().min(0).required(),
    semestersPlanned: Joi.number().integer().max(10).positive().required(),
  });
  return schema.validate(advisingData);
};
module.exports = router;
