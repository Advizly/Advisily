const Joi = require("joi");
const { ID_SCHEMA } = require("../../constants/schemas");
module.exports = {
  getCourses,
};

function getCourses() {
  return Joi.object({
    courseId: ID_SCHEMA,
    courseCode: Joi.number().integer().positive(),
    prefix: Joi.string(),
  });
}
