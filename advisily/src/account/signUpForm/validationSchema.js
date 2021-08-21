import * as Yup from "yup";
import userValidationSchema from "../../subforms/userSubForm/validationSchema";

export default Yup.object({}).concat(userValidationSchema);
