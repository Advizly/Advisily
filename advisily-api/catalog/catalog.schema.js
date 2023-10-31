const Joi = require("joi");
const { ID_SCHEMA, ID_SCHEMA_REQUIRED } = require("../constants/schemas");

module.exports = { getCatalogs, getCatalog, getCatCourses, getPlanCourses, createCatalog };

function getCatalogs() {
  return Joi.object({
    majorId: ID_SCHEMA,
  });
}

function getCatalog() {
  return Joi.object({
    catalogId: ID_SCHEMA_REQUIRED,
  });
}
function getCatCourses() {
  return Joi.object({
    catalogId: ID_SCHEMA,
    courseTypeId: ID_SCHEMA,
  });
}

function getPlanCourses() {
  return Joi.object({
    catalogId: ID_SCHEMA_REQUIRED,
    semesterNumber: Joi.number().positive().integer(),
  });
}


function createCatalog() {
  return Joi.object({
    majorId: ID_SCHEMA_REQUIRED,
    year: Joi.string().regex(/^\d{4}-\d{4}$/).required(),
    coreCredits: Joi.number().integer().positive().required(),
    concReqCredits: Joi.number().integer().positive().required(),
    concElecCredits: Joi.number().integer().positive().required(),
    collateralCredits: Joi.number().integer().positive().required(),
    generalElecCredits: Joi.number().integer().positive().required(),
    engCoreCredits: Joi.number().integer().positive().required()
  });
}