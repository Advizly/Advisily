const Joi = require("joi");
const { ID_SCHEMA, ID_SCHEMA_REQUIRED } = require("../constants/schemas");

module.exports = { createCourse, getTypes, addCourseToPlan, removeCourse, getDistinctCoursesByPrefix, getCourseByCode, addCourseToCat };

function getDistinctCoursesByPrefix() {
  return Joi.object({
    prefix: Joi.string().required()
  });
}

function getCourseByCode() {
  return Joi.object({
    courseCode: Joi.number().required()
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

function removeCourse() {
  return Joi.object({
    courseId: ID_SCHEMA_REQUIRED,
    catalogId: ID_SCHEMA_REQUIRED
  });
}

function getTypes() {
  return Joi.object({
    courseId: ID_SCHEMA
  });
}

function addCourseToPlan() {
  return Joi.object({
    courseId: ID_SCHEMA_REQUIRED,
    catalogId: ID_SCHEMA_REQUIRED,
    semesterNumber: Joi.number().positive().integer().required()
  });
}

function addCourseToCat() {
  return Joi.object({
    courseId: ID_SCHEMA_REQUIRED,
    catalogId: ID_SCHEMA_REQUIRED,
    courseTypeId: Joi.number().positive().integer().required()
  });
}
