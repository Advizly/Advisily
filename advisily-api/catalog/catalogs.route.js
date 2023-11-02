const express = require("express");
const router = express.Router();

const requestValidator = require("../middleware/requestValidator");

const catalogController = require("./catalog.controller");
const schemas = require("./catalog.schema");

router.get(
  "/",
  requestValidator(schemas.getCatalogs(), "query"),
  catalogController.getCatalogs
);
router.get(
  "/catalog",
  requestValidator(schemas.getCatalog(), "query"),
  catalogController.getCatalog
);
router.get(
  "/courses",
  requestValidator(schemas.getCatCourses(), "query"),
  catalogController.getCatCourses
);
router.get(
  "/plans/courses",
  requestValidator(schemas.getPlanCourses(), "query"),
  catalogController.getPlanCourses
);

router.get(
  "/years",
  requestValidator(schemas.getCatalogs(), "query"),
  catalogController.getYears
);

router.post(
  "/",
  requestValidator(schemas.createCatalog(), "body"),
  catalogController.createCatalog
);

router.post(
  "/course",
  requestValidator(schemas.createCourse(), "body"),
  catalogController.createCourse
)

router.post(
  "/copyCatCourses",
  requestValidator(schemas.copyCourses(), "body"),
  catalogController.copyCatalogCourses
);

router.post(
  "/copyPlanCourses",
  requestValidator(schemas.copyCourses(), "body"),
  catalogController.copyPlanCourses
);


module.exports = router;
