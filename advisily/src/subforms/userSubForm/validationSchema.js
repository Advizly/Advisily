import * as Yup from "yup";
import {
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  USER_ID,
  PASSWORD,
  REPEAT_PASSWORD,
} from "./fieldNames";
const REQUIRED_MESSAGE = "This field is required";

const MAX_NAME_LENGTH = 15;
const NAME_FORMAT = /^[A-Za-z1-9]+$/;
const NAME_TOO_LONG = `The name can't exceed ${MAX_NAME_LENGTH} characters long.`;
const INVALID_NAME_FORMAT =
  "Invalid name format. Name can contain letters and numbers only.";

const MIN_ID_VALUE = 100000000;
const MAX_ID_VALUE = 999999999;
const ID_VALUE_TOO_SMALL =
  "Studnet ID must be positive and consist of 9 digits";
const ID_VALUE_TOO_LARGE = "Studnet ID must consist of no more than 9 digits";

const INVALID_EMAIL_FORMAT = "Invalid email format";
const EMAIL_FORMAT = /^.+@aucegypt.edu$/;
const AUC_EMAIL_ONLY = "You can use AUC email only";

const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_TOO_SHORT = `The password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
const PASSWORD_CONTAIN_NO_LETTER = "The password must have at least one letter";
const PASSWORD_CONTAIN_NO_NUMBER = "Password must have at least one number";
const PASSWORD_CONTAINS_SPACE = "Password can't contain spaces";
const PASSWORD_NO_MATCH = "Passwords don't match";

export default Yup.object({
  [FIRST_NAME]: Yup.string()
    .matches(NAME_FORMAT, INVALID_NAME_FORMAT)
    .max(MAX_NAME_LENGTH, NAME_TOO_LONG)
    .required(REQUIRED_MESSAGE),
  [LAST_NAME]: Yup.string()
    .matches(NAME_FORMAT, INVALID_NAME_FORMAT)
    .max(MAX_NAME_LENGTH, NAME_TOO_LONG)
    .required(REQUIRED_MESSAGE),
  [EMAIL]: Yup.string()
    .email(INVALID_EMAIL_FORMAT)
    .required(REQUIRED_MESSAGE)
    .matches(EMAIL_FORMAT, AUC_EMAIL_ONLY),

  [USER_ID]: Yup.number()
    .integer()
    .min(MIN_ID_VALUE, ID_VALUE_TOO_SMALL)
    .max(MAX_ID_VALUE, ID_VALUE_TOO_LARGE)
    .required(REQUIRED_MESSAGE),

  [PASSWORD]: Yup.string()
    .min(MIN_PASSWORD_LENGTH, PASSWORD_TOO_SHORT)
    .matches(/^\S*$/, PASSWORD_CONTAINS_SPACE)
    .matches(/[a-zA-Z]/, PASSWORD_CONTAIN_NO_LETTER)
    .matches(/\d/, PASSWORD_CONTAIN_NO_NUMBER)
    .required(REQUIRED_MESSAGE),
  [REPEAT_PASSWORD]: Yup.string()
    .required(REQUIRED_MESSAGE)
    .oneOf([Yup.ref(PASSWORD), null], PASSWORD_NO_MATCH),
});
