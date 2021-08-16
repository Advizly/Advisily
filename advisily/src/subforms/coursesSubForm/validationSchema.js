import * as Yup from "yup";
import { COURSES_IDS, GENERAL_ELECTIVE_CREDITS } from "./fieldNames";

const REQUIRED_MESSAGE = "This field is required";
const GENERAL_ELECTIVE_LABEL = "Number of general electives";

export default Yup.object({
  [COURSES_IDS]: Yup.array().required(REQUIRED_MESSAGE),

  [GENERAL_ELECTIVE_CREDITS]: Yup.number()
    .integer()
    .min(0)
    .required(REQUIRED_MESSAGE)
    .label(GENERAL_ELECTIVE_LABEL),
});
