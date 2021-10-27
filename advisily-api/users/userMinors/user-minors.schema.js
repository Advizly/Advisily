const Joi = require("joi");
const { ID_SCHEMA_REQUIRED, ID_SCHEMA } = require("../../constants/schemas");

module.exports = {
  getUserMinors,
  addUserMinor,
  deleteUserMinor,
};

function getUserMinors() {
  return Joi.object({
    userId: ID_SCHEMA_REQUIRED,
  });
}
function addUserMinor() {
  return Joi.object({
    userId: ID_SCHEMA_REQUIRED,
    minorId: ID_SCHEMA_REQUIRED,
    catalogId: ID_SCHEMA,
  });
}
function deleteUserMinor() {
  return Joi.object({
    userId: ID_SCHEMA_REQUIRED,
    minorId: ID_SCHEMA_REQUIRED,
    catalogId: ID_SCHEMA,
  });
}
