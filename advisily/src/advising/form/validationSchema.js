import * as Yup from "yup";

import majorValidationSchema from "../../subforms/majorSubForm/validationSchema";
import preferencesValidationSchema from "../../subforms/preferncesSubForm/validationSchema";
import coursesCalidationSchema from "../../subforms/coursesSubForm/validationSchema";

export default Yup.object({})
  .concat(majorValidationSchema)
  .concat(preferencesValidationSchema)
  .concat(coursesCalidationSchema);
