const express = require("express");
const router = express.Router();

const requestValidator = require("../middleware/requestValidator");

const catalogController = require("./catalog.controller");
const schemas = require("./catalog.schema");

router.get("/", catalogController.getCatalogs);
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

module.exports = router;
