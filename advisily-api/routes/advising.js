const auth = require("../middleware/auth");
const Joi = require("joi");

const express = require("express");
const router = express.Router();
const { getConnection } = require("../utils/mysqlUtils");

router.get("/", auth, (req, res) => {
  const connection = getConnection();
  const { studentId } = req.query;
  let query = "select * from advising_sessions ";
  if (studentId) query += "WHERE student_id=?";

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
router.get("/:session_id", auth, (req, res) => {
  const connection = getConnection();
  const query = "select * from advising_sessions WHERE advising_session_id=?";
  connection.query(query, [req.params.session_id], (err, results) => {
    if (err) return res.send(err);

    res.send(results);
    connection.end();
  });
});
router.get("/:session_id/results", auth, (req, res) => {
  const connection = getConnection();
  const query =
    "select arc.*,c.*,d.prefix,d.department_id,d.title AS department_title from advising_result_courses AS arc \
                          INNER JOIN courses AS c ON (c.course_id=arc.course_id)\
                          INNER JOIN departments AS d ON (d.department_id=c.department_id)\
                         WHERE advising_session_id=1";
  connection.query(query, [req.params.session_id], (err, results) => {
    if (err) return res.send(err);

    res.send(results);
    connection.end();
  });
});

router.post("/", auth, (req, res) => {
  const connection = getConnection();
  const advising_data = {
    student_id: req.body.studentId,
    overloading_credits: req.body.overloadingCredits,
    summer_credits: req.body.summerCredits,
    winter_credits: req.body.winterCredits,
    pace_id: req.body.paceId,
    general_elec_credits: req.body.generalElectiveCredits,
    semesters_planned: req.body.semestersPlanned,
  };

  const { error } = validateAdvisingData(advising_data);
  if (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  const query = "INSERT INTO advising_sessions SET ?";
  connection.query(query, advising_data, (err, results) => {
    if (err) return res.send(err);

    res.send(results);
    connection.end();
  });
});

router.put("/", auth, (req, res) => {
  const connection = getConnection();
  const advising_data = {
    advising_session_id: req.body.sessionId,
    student_id: req.user.studentId,
    overloading_credits: req.body.overloadingCredits,
    summer_credits: req.body.summerCredits,
    winter_credits: req.body.winterCredits,
    pace_id: req.body.paceId,
    general_elec_credits: req.body.generalElectiveCredits,
    semesters_planned: req.body.semestersPlanned,
  };

  const { error } = validateAdvisingData(advising_data);
  if (error) res.status(400).send(error);

  const {
    advising_session_id,
    overloading_credits,
    summer_credits,
    winter_credits,
    pace_id,
    general_elec_credits,
    semesters_planned,
  } = advising_data;
  const query =
    "UPDATE advising_sessions SET overloading_credits=?, summer_credits=?,\
                                  winter_credits=?, pace_id=?,\
                                  general_elec_credits=?, semesters_planned=?\
                                  WHERE advising_session_id=?";
  connection.query(
    query,
    [
      overloading_credits,
      summer_credits,
      winter_credits,
      pace_id,
      general_elec_credits,
      semesters_planned,
      advising_session_id,
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
    advising_session_id: Joi.number().integer().positive(),
    student_id: Joi.number().integer().positive().required(),
    overloading_credits: Joi.number().integer().min(0).required(),
    summer_credits: Joi.number().integer().max(7).min(0).required(),
    winter_credits: Joi.number().integer().max(4).min(0).required(),
    pace_id: Joi.number().integer().positive().required(),
    general_elec_credits: Joi.number().integer().min(0).required(),
    semesters_planned: Joi.number().integer().max(10).positive().required(),
  });
  return schema.validate(advisingData);
};
module.exports = router;
