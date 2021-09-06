const Joi = require("joi");
const { ID_SCHEMA, ID_SCHEMA_REQUIRED } = require("../constants/schemas");

module.exports = { getCatalogs, getCatalog, getCatCourses, getPlanCourses };

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
