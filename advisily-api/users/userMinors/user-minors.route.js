const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const requestValidator = require("../../middleware/requestValidator");

const controller = require("./user-minors.controller");
const schemas = require("./user-minors.schema");

router.get(
  "/",
  [auth, requestValidator(schemas.getUserMinors(), "query", {})],
  controller.getUserMinors
);

router.post(
  "/",
  [auth, requestValidator(schemas.addUserMinor())],
  controller.addUserMinor
);

router.delete(
  "/",
  [auth, requestValidator(schemas.deleteUserMinor())],
  controller.deleteUserMinor
);

module.exports = router;
