const Joi = require("joi");
const { ID_SCHEMA } = require("../../constants/schemas");
module.exports = {
  getMajors,
};

function getMajors() {
  return Joi.object({
    majorId: ID_SCHEMA,
  });
}
