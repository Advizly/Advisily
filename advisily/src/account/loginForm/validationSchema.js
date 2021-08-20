import * as Yup from "yup";
import { PASSWORD, EMAIL } from "./fieldNames";

const REQUIRED_MESSAGE = "This field is required";

const INVALID_EMAIL_FORMAT = "Invalid email format";
const EMAIL_FORMAT = /^.+@aucegypt.edu$/;
const AUC_EMAIL_ONLY = "You can use AUC email only";

const loginSchema = Yup.object({
  [EMAIL]: Yup.string()
    .email(INVALID_EMAIL_FORMAT)
    .required(REQUIRED_MESSAGE)
    .matches(EMAIL_FORMAT, AUC_EMAIL_ONLY),
  [PASSWORD]: Yup.string().required(REQUIRED_MESSAGE),
});
export default loginSchema;
