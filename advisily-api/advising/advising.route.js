const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();

const controller = require("./advising.cotroller");
const schemas = require("./advising.schema");
const requestValidator = require("../middleware/requestValidator");

router.get("/paces", controller.getPaces);

router.get("/getAllResults", [], controller.getAllResults);
router.get("/getAdvisedUsers", auth, controller.getAdvisedUsers);
router.get(
  "/",
  [auth, requestValidator(schemas.getAdvisingSessions())],
  controller.getAdvisingSessions
);

router.get(
  "/:advisingSessionId",
  [auth, requestValidator(schemas.getAdvisingSession())],
  controller.getAdvisingSession
);
router.get(
  "/:advisingSessionId/results",
  [auth, requestValidator(schemas.getAdvisingResults(), "params")],
  controller.getAdvisingResults
);
router.get(
  "/:advisingSessionId/results/courses",
  [requestValidator(schemas.getAdvisingResultCourses(), "params")],
  controller.getAdvisingResultCourses
);
router.post(
  "/",
  [auth, requestValidator(schemas.addAdvisingSession())],
  controller.addAdvisingSession
);

router.post(
  "/verifyResults",
  [auth, requestValidator(schemas.verifyResults())],
  controller.verifyResults
);
router.get(
  "/getUserAdvisingId/:userId",
  [(auth, requestValidator(schemas.getUserAdvisingSessionId(), "params"))],
  controller.getUserAdvisingSessionId
);
// router.put(
//   "/",
//   [auth, requestValidator(schemas.updateAdvisingSession())],
//   controller.updateAdvisingSession
// );

router.post(
  "/generatePlan",
  [auth, requestValidator(schemas.generatePlan())],
  controller.generatePlan
);

router.post(
  "/generateAllPlans",
  // [auth, requestValidator(schemas.generatePlan())],
  controller.generateAllPlans
);

module.exports = router;
