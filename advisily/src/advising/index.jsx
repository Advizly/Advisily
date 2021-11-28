import { Route, Switch } from "react-router-dom";

import AdvisingHome from "./AdvisingHome";
import AdvisingResults from "./AdvisingResults";
import AdvisingForm from "./form/AdvisingForm";

import {
  ADVISING_FORM_ROUTE,
  ADVISING_HOME_ROUTE,
  ADVISING_RESULTS_ROUTE,
  ADVISED_USERS_ROUTE,
} from "./routes";
import AdvisedUsers from "./AdvisedUsers";

const AdvisingRouter = () => (
  <Switch>
    <Route path={ADVISING_HOME_ROUTE} exact component={AdvisingHome} />
    <Route path={ADVISING_RESULTS_ROUTE} component={AdvisingResults} />
    <Route path={ADVISING_FORM_ROUTE} component={AdvisingForm} />
    <Route path={ADVISED_USERS_ROUTE} component={AdvisedUsers} />
  </Switch>
);

export { ADVISING_FORM_ROUTE, ADVISING_HOME_ROUTE, ADVISING_RESULTS_ROUTE };

export default AdvisingRouter;
