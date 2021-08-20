import * as Yup from "yup";
import { PASSWORD, REPEAT_PASSWORD } from "./fieldNames";

const REQUIRED_MESSAGE = "This field is required";

const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_TOO_SHORT = `The password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
const PASSWORD_CONTAIN_NO_LETTER = "The password must have at least one letter";
const PASSWORD_CONTAIN_NO_NUMBER = "Password must have at least one number";
const PASSWORD_CONTAINS_SPACE = "Password can't contain spaces";
const PASSWORD_NO_MATCH = "Passwords don't match";

const resetPasswordSchema = Yup.object({
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
export default resetPasswordSchema;
