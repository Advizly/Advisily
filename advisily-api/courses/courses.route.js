const express = require("express");
const router = express.Router();

const requestValidator = require("../middleware/requestValidator");
const auth = require("../middleware/auth")

const coursesController = require("./courses.controller");
const schemas = require("./courses.schema");


router.post(
  "/",
  auth,
  requestValidator(schemas.createCourse(), "body"),
  coursesController.createCourse
)

router.get(
  "/",
  auth,
  coursesController.getAllCourses
)

router.get(
  "/types",
  auth,
  requestValidator(schemas.getTypes(), "query"),
  coursesController.getTypes
)


router.post(
  "/addCourseToPlan",
  auth,
  requestValidator(schemas.addCourseToPlan(), "body"),
  coursesController.addCourseToPlan
);

router.get("/distinctPrefixes", coursesController.getDistinctPrefixes);

router.get("/majors", coursesController.getMajors)

router.get(
  "/courseByCodePrefix",
  requestValidator(schemas.getCourseByCode(), "query"),
  coursesController.getCourseByCode
);

router.delete(
  "/removeCourseFromPlan",
  auth,
  requestValidator(schemas.removeCourse(), "body"),
  coursesController.removeCourseFromPlan
);

router.get(
  "/coursesByPrefix",
  auth,
  requestValidator(schemas.getDistinctCoursesByPrefix(), "query"),
  coursesController.getDistinctCoursesByPrefix
);

router.delete(
  "/removeCourseFromCatalog",
  auth,
  requestValidator(schemas.removeCourse(), "body"),
  coursesController.removeCourseFromCatalog
);

module.exports = router;
