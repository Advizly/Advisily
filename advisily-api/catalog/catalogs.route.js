const express = require("express");
const router = express.Router();

const requestValidator = require("../middleware/requestValidator");
const auth = require("../middleware/auth")

const catalogController = require("./catalog.controller");
const schemas = require("./catalog.schema");

router.get(
  "/",
  auth,
  requestValidator(schemas.getCatalogs(), "query"),
  catalogController.getCatalogs
);
router.get(
  "/catalog",
  auth,
  requestValidator(schemas.getCatalog(), "query"),
  catalogController.getCatalog
);
router.get(
  "/courses",
  auth,
  requestValidator(schemas.getCatCourses(), "query"),
  catalogController.getCatCourses
);
router.get(
  "/plans/courses",
  auth,
  requestValidator(schemas.getPlanCourses(), "query"),
  catalogController.getPlanCourses
);

router.get(
  "/years",
  auth,
  requestValidator(schemas.getCatalogs(), "query"),
  catalogController.getYears
);

router.post(
  "/",
  auth,
  requestValidator(schemas.createCatalog(), "body"),
  catalogController.createCatalog
);

router.post(
  "/course",
  auth,
  requestValidator(schemas.createCourse(), "body"),
  catalogController.createCourse
)

router.post(
  "/copyCatCourses",
  auth,
  requestValidator(schemas.copyCourses(), "body"),
  catalogController.copyCatalogCourses
);

router.post(
  "/copyPlanCourses",
  auth,
  requestValidator(schemas.copyCourses(), "body"),
  catalogController.copyPlanCourses
);


module.exports = router;
