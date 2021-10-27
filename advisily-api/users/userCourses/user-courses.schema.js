const Joi = require("joi");
const { ID_SCHEMA_REQUIRED } = require("../../constants/schemas");

module.exports = {
  getUserCourses,
  addUserCourse,
  deleteUserCourse,
};

function getUserCourses() {
  return Joi.object({
    userId: ID_SCHEMA_REQUIRED,
  });
}
function addUserCourse() {
  return Joi.object({
    userId: ID_SCHEMA_REQUIRED,
    courseId: ID_SCHEMA_REQUIRED,
  });
}
function deleteUserCourse() {
  return Joi.object({
    userId: ID_SCHEMA_REQUIRED,
    courseId: ID_SCHEMA_REQUIRED,
  });
}
