const Joi = require("joi");
const { join } = require("lodash");
const {
  ID_SCHEMA,
  ID_SCHEMA_REQUIRED,
  CREDITS_SCHEMA,
} = require("../constants/schemas");

module.exports = {
  getAdvisingSessions,
  getAdvisingSession,
  getAdvisingResults,
  getAdvisingResultCourses,
  addAdvisingSession,
  updateAdvisingSession,
  generatePlan,
  verifyResults,

  getUserAdvisingSessionId,
  addAdvisingResults,
};

function getAdvisingSessions() {
  return Joi.object({
    userId: ID_SCHEMA,
  });
}

function getUserAdvisingSessionId() {
  return Joi.object({
    userId: ID_SCHEMA,
  });
}

function getAdvisingSession() {
  return Joi.object({
    sessionId: ID_SCHEMA_REQUIRED,
  });
}

function getAdvisingResults() {
  return Joi.object({
    advisingSessionId: ID_SCHEMA_REQUIRED,
  });
}
function getAdvisingResultCourses() {
  return Joi.object({
    advisingSessionId: ID_SCHEMA_REQUIRED,
  });
}

function addAdvisingSession() {
  return Joi.object({
    advisingSessionId: ID_SCHEMA,
    exemptedCredits: CREDITS_SCHEMA,
    generalElecCredits: CREDITS_SCHEMA.required(),
    overloadingCredits: CREDITS_SCHEMA.required(),
    paceId: ID_SCHEMA_REQUIRED,
    summerCredits: CREDITS_SCHEMA.max(7).required(),
    userId: ID_SCHEMA_REQUIRED,
    semestersToPlan: ID_SCHEMA.max(10),
    winterCredits: CREDITS_SCHEMA.max(4).required(),
  });
}

function updateAdvisingSession() {
  return Joi.object({
    advisingSessionId: ID_SCHEMA.required(),
    userId: ID_SCHEMA_REQUIRED,
    overloadingCredits: CREDITS_SCHEMA.required(),
    summerCredits: CREDITS_SCHEMA.max(7).required(),
    winterCredits: CREDITS_SCHEMA.max(4).required(),
    paceId: ID_SCHEMA_REQUIRED,
    generalElecCredits: CREDITS_SCHEMA.required(),
    semestersToPlan: ID_SCHEMA.max(10),
    exemptedCredits: CREDITS_SCHEMA,
    semesterNumber: Joi.number().integer().min(1),
  });
}

function generatePlan() {
  return Joi.object({
    advisingSessionId: ID_SCHEMA_REQUIRED,
  });
}

function addAdvisingResults() {
  return Joi.object({
    advisingSessionId: ID_SCHEMA_REQUIRED,
    courseId: ID_SCHEMA_REQUIRED,
    semesterNumber: Joi.number().integer().positive(),
  });
}

function verifyResults() {
  return Joi.object({
    advisingSessionId: ID_SCHEMA_REQUIRED,
  });
}
