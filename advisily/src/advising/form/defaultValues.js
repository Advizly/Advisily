import majorDefaultValues from "../../subforms/majorSubForm/defaultValues";
import preferencesDefaultValues from "../../subforms/preferncesSubForm/defaultValues";
import coursesDefaultValues from "../../subforms/coursesSubForm/defaultValues";
const advisingDefautlValues = {
  ...majorDefaultValues,
  ...preferencesDefaultValues,
  ...coursesDefaultValues,
};
export default advisingDefautlValues;
