const express = require("express");

const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const router = express.Router();

const generateToken = require("../utils/tokenGenerator");
const { getConnection } = require("../utils/mysqlUtils");

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const connection = getConnection();
  const usrQuery = "SELECT * from users WHERE studentId=?";
  connection.query(usrQuery, [req.body.studentId], async (err, results) => {
    if (err) return res.status(400).send(err);

    //student not found
    if (!results || results.length === 0)
      return res.status(400).send("Invalid ID");

    const user = results[0];
    //check password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).send("Invalid password and ID combination");

    if (!user.isVerified)
      return res.status(401).send("Please verify your email first");

    //generate auth token
    const token = generateToken(results[0]);
    res.send(token);
  });
  connection.end();
});

const validate = (req) => {
  const schema = Joi.object({
    studentId: Joi.number().positive().integer().required().label("Student ID"),
    password: Joi.string().required().min(8).label("Password "),
  });

  return schema.validate(req);
};
module.exports = router;
