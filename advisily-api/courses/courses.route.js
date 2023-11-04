const express = require("express");
const router = express.Router();

const requestValidator = require("../middleware/requestValidator");

const coursesController = require("./courses.controller");
const schemas = require("./courses.schema");


router.post(
  "/",
  requestValidator(schemas.createCourse(), "body"),
  coursesController.createCourse
)

router.get(
  "/",
  coursesController.getAllCourses
)

router.get(
  "/types",
  requestValidator(schemas.getTypes(), "query"),
  coursesController.getTypes
)


router.post(
  "/addCourseToPlan",
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
  requestValidator(schemas.removeCourse(), "body"),
  coursesController.removeCourseFromPlan
);

router.get(
  "/coursesByPrefix",
  requestValidator(schemas.getDistinctCoursesByPrefix(), "query"),
  coursesController.getDistinctCoursesByPrefix
);

router.delete(
  "/removeCourseFromCatalog",
  requestValidator(schemas.removeCourse(), "body"),
  coursesController.removeCourseFromCatalog
);

module.exports = router;
