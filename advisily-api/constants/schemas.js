const Joi = require("joi");
const { JoiPassword } = require("joi-password");

const TOKEN_SCHEMA = Joi.string();
const ID_SCHEMA = Joi.number().positive().integer();
const NAME_SCHEMA = Joi.string().alphanum().min(1).max(30);
const EMAIL_SCHEMA = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ["edu"] } })
  .message("Invalid email.");
const PASSWORD_SCHEMA = JoiPassword.string()
  .min(8)
  .max(30)
  .minOfNumeric(1)
  .noWhiteSpaces()
  .pattern(new RegExp("^.*[a-zA-Z]+.*$"));
const REPEAT_PASSWORD_SCHEMA = Joi.ref("password");

const ID_SCHEMA_REQUIRED = ID_SCHEMA.required();
const TOKEN_SCHEMA_REQUIRED = TOKEN_SCHEMA.required();
const NAME_SCHEMA_REQUIRED = NAME_SCHEMA.required();
const EMAIL_SCHEMA_REQUIRED = EMAIL_SCHEMA.required();
const PASSWORD_SCHEMA_REQUIRED = PASSWORD_SCHEMA.required();

const CREDITS_SCHEMA = Joi.number().integer().min(0);

module.exports = {
  TOKEN_SCHEMA,
  TOKEN_SCHEMA_REQUIRED,
  ID_SCHEMA,
  ID_SCHEMA_REQUIRED,
  NAME_SCHEMA,
  NAME_SCHEMA_REQUIRED,
  EMAIL_SCHEMA,
  PASSWORD_SCHEMA,
  REPEAT_PASSWORD_SCHEMA,
  CREDITS_SCHEMA,
  EMAIL_SCHEMA_REQUIRED,
  PASSWORD_SCHEMA_REQUIRED,
};
