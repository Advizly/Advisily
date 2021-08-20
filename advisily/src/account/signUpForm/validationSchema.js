import * as Yup from "yup";
import userValidationSchema from "../../subforms/userSubForm/validationSchema";
import majorValidateValidationSchema from "../../subforms/majorSubForm/validationSchema";

export default Yup.object({})
  .concat(userValidationSchema)
  .concat(majorValidateValidationSchema);
