const express = require("express");
const router = express.Router();

const controller = require("./user-courses.controller");
const schemas = require("./user-courses.schema");

const auth = require("../../middleware/auth");
const requestValidator = require("../../middleware/requestValidator");

router.get(
  "/",
  [auth, requestValidator(schemas.getUserCourses(), "query", {})],
  controller.getUserCourses
);

router.post(
  "/",
  [auth, requestValidator(schemas.addUserCourse())],
  controller.addUserCourse
);

router.delete(
  "/",
  [auth, requestValidator(schemas.deleteUserCourse())],
  controller.deleteUserCourse
);

module.exports = router;
