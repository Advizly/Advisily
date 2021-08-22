const express = require("express");
const router = express.Router();

const requestValidator = require("../../middleware/requestValidator");

const controller = require("./majors.controller");
const schemas = require("./majors.schema");

router.get(
  "/",
  requestValidator(schemas.getMajors(), "query"),
  controller.getMajors
);

module.exports = router;
