const Joi = require("joi");

const {
  EMAIL_SCHEMA,
  NAME_SCHEMA,
  PASSWORD_SCHEMA,
  REPEAT_PASSWORD_SCHEMA,
  TOKEN_SCHEMA,
  TOKEN_SCHEMA_REQUIRED,
  ID_SCHEMA_REQUIRED,
} = require("../constants/schemas");

module.exports = {
  register,
  getUser,
  resetPassword,
  verifyEmail,
  forgotPassword,
  validateResetToken,
  resendVerification,
  loginSchema,
};

function register() {
  return Joi.object({
    studentId: ID_SCHEMA_REQUIRED,
    firstName: NAME_SCHEMA,
    lastName: NAME_SCHEMA,
    password: PASSWORD_SCHEMA,
    repeatPassword: REPEAT_PASSWORD_SCHEMA,
    email: EMAIL_SCHEMA,
  });
}

function resetPassword() {
  return Joi.object({
    token: TOKEN_SCHEMA_REQUIRED,
    password: PASSWORD_SCHEMA,
  });
}

function verifyEmail() {
  return Joi.object({ token: TOKEN_SCHEMA_REQUIRED });
}

function forgotPassword() {
  return Joi.object({ email: EMAIL_SCHEMA });
}
function validateResetToken() {
  return Joi.object({ token: TOKEN_SCHEMA_REQUIRED });
}

function resendVerification() {
  return Joi.object({ email: EMAIL_SCHEMA });
}
function getUser() {
  return Joi.object({
    studentId: Joi.number().positive().integer(),
    firstName: Joi.string().alphanum().min(1).max(30),
    lastName: Joi.string().alphanum().min(1).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["edu"] },
    }),
    passwordResetToken: TOKEN_SCHEMA,
  });
}

function loginSchema() {
  return Joi.object({
    email: EMAIL_SCHEMA.label("Email"),
    password: PASSWORD_SCHEMA,
  });
}
