const Joi = require("joi");

const {
  EMAIL_SCHEMA,
  NAME_SCHEMA,
  NAME_SCHEMA_REQUIRED,
  PASSWORD_SCHEMA,
  REPEAT_PASSWORD_SCHEMA,
  TOKEN_SCHEMA,
  TOKEN_SCHEMA_REQUIRED,
  ID_SCHEMA,
  ID_SCHEMA_REQUIRED,
  EMAIL_SCHEMA_REQUIRED,
  PASSWORD_SCHEMA_REQUIRED,
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
  updateSchema,
};

function register() {
  return Joi.object({
    userId: ID_SCHEMA_REQUIRED,
    firstName: NAME_SCHEMA_REQUIRED,
    lastName: NAME_SCHEMA_REQUIRED,
    password: PASSWORD_SCHEMA_REQUIRED,
    repeatPassword: REPEAT_PASSWORD_SCHEMA,
    email: EMAIL_SCHEMA_REQUIRED,
  });
}

function resetPassword() {
  return Joi.object({
    token: TOKEN_SCHEMA_REQUIRED,
    password: PASSWORD_SCHEMA_REQUIRED,
  });
}

function verifyEmail() {
  return Joi.object({ token: TOKEN_SCHEMA_REQUIRED });
}

function forgotPassword() {
  return Joi.object({ email: EMAIL_SCHEMA_REQUIRED });
}
function validateResetToken() {
  return Joi.object({ token: TOKEN_SCHEMA_REQUIRED });
}

function resendVerification() {
  return Joi.object({ email: EMAIL_SCHEMA_REQUIRED });
}
function getUser() {
  return Joi.object({
    userId: Joi.number().positive().integer(),
    firstName: NAME_SCHEMA,
    lastName: NAME_SCHEMA,
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["edu"] },
    }),
    passwordResetToken: TOKEN_SCHEMA,
  });
}

function loginSchema() {
  return Joi.object({
    email: EMAIL_SCHEMA_REQUIRED.label("Email"),
    password: PASSWORD_SCHEMA_REQUIRED,
  });
}
function updateSchema() {
  return Joi.object({
    userId: ID_SCHEMA,
    firstName: NAME_SCHEMA,
    lastName: NAME_SCHEMA,
    email: EMAIL_SCHEMA,
    password: PASSWORD_SCHEMA,
    advisingSessionId: ID_SCHEMA,
    standingId: ID_SCHEMA,
  });
}
