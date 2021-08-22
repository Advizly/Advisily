const auth = require("../../middleware/auth");

const express = require("express");
const router = express.Router();

const controller = require("./user-majors.controller");
const schemas = require("./user-majors.schema");
const requestValidator = require("../../middleware/requestValidator");

router.get(
  "/",
  [auth, requestValidator(schemas.getUserMajors(), "query", {})],
  controller.getUserMajors
);

router.post(
  "/",
  [auth, requestValidator(schemas.addUserMajor())],
  controller.addUserMajor
);

router.delete(
  "/",
  [auth, requestValidator(schemas.deleteUserMajor())],
  controller.deleteUserMajor
);

module.exports = router;
