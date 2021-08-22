const Joi = require("joi");
const {
  ID_SCHEMA,
  ID_SCHEMA_REQUIRED,
  CREDITS_SCHEMA,
} = require("../constants/schemas");

module.exports = {
  getAdvisingSessions,
  getAdvisingSession,
  getAdvisingResults,
  addAdvisingSession,
  updateAdvisingSession,
};

function getAdvisingSessions() {
  return Joi.object({
    studentId: ID_SCHEMA,
  });
}

function getAdvisingSession() {
  return Joi.object({
    sessionId: ID_SCHEMA_REQUIRED,
  });
}

function getAdvisingResults() {
  return Joi.object({
    sessionId: ID_SCHEMA_REQUIRED,
  });
}

function addAdvisingSession() {
  return Joi.object({
    advisingSessionId: ID_SCHEMA,
    studentId: ID_SCHEMA_REQUIRED,
    overloadingCredits: CREDITS_SCHEMA.required(),
    summerCredits: CREDITS_SCHEMA.max(7).required(),
    winterCredits: CREDITS_SCHEMA.max(4).required(),
    paceId: ID_SCHEMA_REQUIRED,
    generalElecCredits: CREDITS_SCHEMA.required(),
    semestersPlanned: ID_SCHEMA.max(10),
  });
}

function updateAdvisingSession() {
  return Joi.object({
    advisingSessionId: ID_SCHEMA.required(),
    studentId: ID_SCHEMA_REQUIRED,
    overloadingCredits: CREDITS_SCHEMA.required(),
    summerCredits: CREDITS_SCHEMA.max(7).required(),
    winterCredits: CREDITS_SCHEMA.max(4).required(),
    paceId: ID_SCHEMA_REQUIRED,
    generalElecCredits: CREDITS_SCHEMA.required(),
    semestersPlanned: ID_SCHEMA.max(10),
  });
}
