import * as Yup from "yup";
import {
  MAJOR_ID,
  CATALOG_ID,
  SECOND_MAJOR_ID,
  SECOND_CATALOG_ID,
  MINOR_IDS,
  IS_DOUBLE_MAJORING,
  IS_MINORING,
} from "./fieldNames";

const REQUIRED_MESSAGE = "This field is required";
const SAME_MAJOR_SELECTED = "You can't select the same major";

export default Yup.object({
  [MAJOR_ID]: Yup.string().required(REQUIRED_MESSAGE),

  [CATALOG_ID]: Yup.string().required(REQUIRED_MESSAGE),
  [IS_MINORING]: Yup.boolean().required(REQUIRED_MESSAGE),
  [MINOR_IDS]: Yup.array().required(),
  [IS_DOUBLE_MAJORING]: Yup.boolean().required(REQUIRED_MESSAGE),
  [SECOND_MAJOR_ID]: Yup.string()
    .notRequired()
    .when(IS_DOUBLE_MAJORING, {
      is: true,
      then: Yup.string()
        .required(REQUIRED_MESSAGE)
        .notOneOf([Yup.ref(MAJOR_ID), null], SAME_MAJOR_SELECTED),
    }),
  [SECOND_CATALOG_ID]: Yup.string()
    .notRequired()
    .when(IS_DOUBLE_MAJORING, {
      is: true,
      then: Yup.string().required(REQUIRED_MESSAGE),
    }),
});
