import {
  MAJOR_ID,
  CATALOG_ID,
  SECOND_MAJOR_ID,
  SECOND_CATALOG_ID,
  MINOR_IDS,
  IS_DOUBLE_MAJORING,
  IS_MINORING,
  STANDING_ID,
  SEMESTER_NUMBER,
} from "./fieldNames";

const majorDefaultValues = {
  [MAJOR_ID]: "",
  [CATALOG_ID]: "",
  [IS_DOUBLE_MAJORING]: "",
  [SECOND_MAJOR_ID]: "",
  [SECOND_CATALOG_ID]: "",
  [IS_MINORING]: "",
  [MINOR_IDS]: [],
  [STANDING_ID]: "",
  [SEMESTER_NUMBER]: "",
};

export default majorDefaultValues;
