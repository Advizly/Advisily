const express = require("express");
const router = express.Router();

const requestValidator = require("../../middleware/requestValidator");

const controller = require("./courses.controller");
const schemas = require("./courses.schema");

router.get(
  "/",
  requestValidator(schemas.getCourses(), "query"),
  controller.getCourses
);

module.exports = router;
