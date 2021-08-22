const auth = require("../middleware/auth");
const Joi = require("joi");

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

const validateAdvisingData = (advisingData) => {
  const schema = Joi.object({
    advisingSessionId: Joi.number().integer().positive(),
    studentId: Joi.number().integer().positive().required(),
    overloadingCredits: Joi.number().integer().min(0).required(),
    summerCredits: Joi.number().integer().max(7).min(0).required(),
    winterCredits: Joi.number().integer().max(4).min(0).required(),
    paceId: Joi.number().integer().positive().required(),
    generalElecCredits: Joi.number().integer().min(0).required(),
    semestersPlanned: Joi.number().integer().max(10).positive().required(),
  });
  return schema.validate(advisingData);
};
module.exports = router;
