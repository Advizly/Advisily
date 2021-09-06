const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();

const controller = require("./advising.cotroller");
const schemas = require("./advising.schema");
const requestValidator = require("../middleware/requestValidator");

router.get(
  "/",
  [auth, requestValidator(schemas.getAdvisingSessions())],
  controller.getAdvisingSessions
);

router.get("/paces", controller.getPaces);

router.get(
  "/:sessionId",
  [auth, requestValidator(schemas.getAdvisingSession())],
  controller.getAdvisingSession
);
router.get(
  "/:sessionId/results",
  [auth, requestValidator(schemas.getAdvisingResults())],
  controller.getAdvisingResults
);

router.post(
  "/",
  [auth, requestValidator(schemas.addAdvisingSession())],
  controller.addAdvisingSession
);

router.put(
  "/",
  [auth, requestValidator(schemas.updateAdvisingSession())],
  controller.updateAdvisingSession
);

console.log(controller.generatePlan);
router.post(
  "/generate-plan",
  [auth, requestValidator(schemas.generatePlan())],
  controller.generatePlan
);
module.exports = router;
