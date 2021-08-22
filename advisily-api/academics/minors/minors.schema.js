const Joi = require("joi");
const { ID_SCHEMA } = require("../../constants/schemas");
module.exports = {
  getMinors,
};

function getMinors() {
  return Joi.object({
    minorId: ID_SCHEMA,
  });
}
