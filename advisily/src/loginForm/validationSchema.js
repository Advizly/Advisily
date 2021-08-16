import * as Yup from "yup";
import { PASSWORD, STUDENT_ID } from "./fieldNames";

const REQUIRED_MESSAGE = "This field is required";

const MIN_ID_VALUE = 100000000;
const MAX_ID_VALUE = 999999999;
const ID_VALUE_TOO_SMALL =
  "Studnet ID must be positive and consist of 9 digits";
const ID_VALUE_TOO_LARGE = "Studnet ID must consist of no more than 9 digits";

const loginSchema = Yup.object({
  [STUDENT_ID]: Yup.number()
    .positive()
    .integer()
    .min(MIN_ID_VALUE, ID_VALUE_TOO_SMALL)
    .max(MAX_ID_VALUE, ID_VALUE_TOO_LARGE)
    .required(REQUIRED_MESSAGE),
  [PASSWORD]: Yup.string().required(REQUIRED_MESSAGE),
});
export default loginSchema;
