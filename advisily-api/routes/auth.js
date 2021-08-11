const express = require("express");

const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const router = express.Router();

const generateToken = require("../utils/tokenGenerator");
const { getConnection } = require("../utils/mysqlUtils");

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const connection = getConnection();
  const usrQuery = "SELECT * from students WHERE student_id=?";
  connection.query(usrQuery, [req.body.studentId], async (err, results) => {
    if (err) return res.status(400).send(err);

    //student not found
    if (!results || results.length === 0)
      return res.status(400).send("Student ID not found");

    //check password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      results[0].password
    );
    if (!validPassword) return res.status(400).send("Invalid password");

    //generate auth token
    const { student_id: studentId, email } = results[0];
    const token = generateToken({ studentId, email });
    res.send(token);
  });
  connection.end();
});

const validate = (req) => {
  const schema = Joi.object({
    studentId: Joi.number().positive().integer().required(),
    password: Joi.string().required().min(8),
  });

  return schema.validate(req);
};
module.exports = router;
