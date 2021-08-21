const Joi = require("joi");
const { JoiPassword } = require("joi-password");

module.exports = {
  register,
  getUser,
  resetPassword,
  verifyEmail,
  forgotPassword,
  validateResetToken,
  resendVerification,
};

const TOKEN_SCHEMA = Joi.string();
const TOKEN_SCHEMA_REQUIRED = TOKEN_SCHEMA.required();
const ID_SCHEMA = Joi.number().positive().integer().required();
const NAME_SCHEMA = Joi.string().alphanum().min(1).max(30).required();
const EMAIL_SCHEMA = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ["edu"] } })
  .required();
const PASSWORD_SCHEMA = JoiPassword.string()
  .min(8)
  .max(30)
  .minOfNumeric(1)
  .noWhiteSpaces()
  .pattern(new RegExp("^.*[a-zA-Z]+.*$"))
  .required();
const REPEAT_PASSWORD_SCHEMA = Joi.ref("password");

function register() {
  return Joi.object({
    studentId: ID_SCHEMA,
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
