import * as Yup from "yup";
import {
  OVERLOADING,
  OVERLOADING_CREDITS,
  PACE_ID,
  SEMESTERS_PLANNED,
  SUMMER_CREDITS,
  TAKING_SUMMER,
  TAKING_WINTER,
  WINTER_CREDITS,
} from "./fieldNames";

const REQUIRED_MESSAGE = "This field is required";
const OVERLOADING_CREDITS_LABEL = "Overloading credits";
const SUMMER_CREDITS_LABEL = "Credits in summer";
const WINTER_CREDITS_LABEL = "Credits in winter";

export default Yup.object({
  [OVERLOADING]: Yup.boolean().required(REQUIRED_MESSAGE),
  [OVERLOADING_CREDITS]: Yup.number().when(OVERLOADING, {
    is: true,
    then: Yup.number()
      .min(1)
      .required(REQUIRED_MESSAGE)
      .label(OVERLOADING_CREDITS_LABEL),
  }),
  [TAKING_SUMMER]: Yup.boolean().required(REQUIRED_MESSAGE),
  [WINTER_CREDITS]: Yup.number().when(TAKING_WINTER, {
    is: true,
    then: Yup.number()
      .required(REQUIRED_MESSAGE)
      .min(1)
      .max(4)
      .label(WINTER_CREDITS_LABEL),
  }),
  [TAKING_WINTER]: Yup.boolean().required(REQUIRED_MESSAGE),
  [SUMMER_CREDITS]: Yup.number()
    .min(0)
    .max(7)
    .when(TAKING_SUMMER, {
      is: true,
      then: Yup.number()
        .required(REQUIRED_MESSAGE)
        .min(1)
        .max(7)
        .label(SUMMER_CREDITS_LABEL),
    }),
  [PACE_ID]: Yup.string().required(REQUIRED_MESSAGE),
  [SEMESTERS_PLANNED]: Yup.number().required(REQUIRED_MESSAGE).min(1),
});
