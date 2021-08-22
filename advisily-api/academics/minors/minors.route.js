const express = require("express");
const router = express.Router();

const requestValidator = require("../../middleware/requestValidator");

const controller = require("./minors.controller");
const schemas = require("./minors.schema");

router.get(
  "/",
  requestValidator(schemas.getMinors(), "query"),
  controller.getMinors
);

module.exports = router;
