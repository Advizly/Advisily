const Joi = require("joi");
const { ID_SCHEMA_REQUIRED, ID_SCHEMA } = require("../../constants/schemas");

module.exports = {
  getUserMajors,
  addUserMajor,
  deleteUserMajor,
};

function getUserMajors() {
  return Joi.object({
    userId: ID_SCHEMA_REQUIRED,
  });
}
function addUserMajor() {
  return Joi.object({
    userId: ID_SCHEMA_REQUIRED,
    majorId: ID_SCHEMA_REQUIRED,
    catalogId: ID_SCHEMA_REQUIRED,
  });
}
function deleteUserMajor() {
  return Joi.object({
    userId: ID_SCHEMA_REQUIRED,
    majorId: ID_SCHEMA_REQUIRED,
    catalogId: ID_SCHEMA,
  });
}
