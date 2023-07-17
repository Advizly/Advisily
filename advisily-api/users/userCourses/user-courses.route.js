const express = require("express");
const router = express.Router();

const controller = require("./user-courses.controller");
const schemas = require("./user-courses.schema");

const auth = require("../../middleware/auth");
const requestValidator = require("../../middleware/requestValidator");
const verifyJwt = require("../../middleware/verifyJwt");

router.get(
  "/",
  requestValidator(schemas.getUserCourses(), "query", {}),
  verifyJwt,
  controller.getUserCourses
);

router.post(
  "/",
  auth, requestValidator(schemas.addUserCourse()),
  verifyJwt,
  controller.addUserCourse
);

router.delete(
  "/",
  requestValidator(schemas.deleteUserCourse()),
  verifyJwt,
  controller.deleteUserCourse
);

module.exports = router;
