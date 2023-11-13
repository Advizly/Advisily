const Joi = require("joi");
const { ID_SCHEMA, ID_SCHEMA_REQUIRED } = require("../constants/schemas");

module.exports = { getCatalogs, getCatalog, getCatCourses, getPlanCourses, createCatalog, createCourse, copyCourses };

function getCatalogs() {
  return Joi.object({
    majorId: ID_SCHEMA,
  });
}

function createCourse() {
  return Joi.object({
    courseCode: Joi.number().required(),
    courseTitle: Joi.string().required(),
    credits: Joi.number().optional(),
    prefix: Joi.string().optional()
  });
}

function copyCourses() {
  return Joi.object({
    sourceCatalogId: ID_SCHEMA_REQUIRED,
    targetCatalogId: ID_SCHEMA_REQUIRED
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
    coreCredits: Joi.number().integer().min(0).required(),
    concReqCredits: Joi.number().integer().min(0).required(),
    concElecCredits: Joi.number().integer().min(0).required(),
    collateralCredits: Joi.number().integer().min(0).required(),
    generalElecCredits: Joi.number().integer().min(0).required(),
    engCoreCredits: Joi.number().integer().min(0).required()
  });
}