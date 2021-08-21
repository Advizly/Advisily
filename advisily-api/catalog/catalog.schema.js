const Joi = require("joi");

module.exports = { getCatalog, getCatCourses };

const ID_SCHEMA = Joi.number().integer().positive();

function getCatalog() {
  return Joi.object({
    catalogId: ID_SCHEMA.required(),
  });
}
function getCatCourses() {
  return Joi.object({
    catalogId: ID_SCHEMA,
    courseTypeId: ID_SCHEMA,
  });
}
