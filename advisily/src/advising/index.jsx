import { Route, Switch } from "react-router-dom";

import AdvisingHome from "./AdvisingHome";
import AdvisingResults from "./AdvisingResults";
import AdvisingForm from "./form/AdvisingForm";

import {
  ADVISING_FORM_ROUTE,
  ADVISING_HOME_ROUTE,
  ADVISING_RESULTS_ROUTE,
  ADVISED_USERS_ROUTE,
  DOWNLOAD_ALL_RESULTS_ROUTE,
} from "./routes";
import AdvisedUsers from "./AdvisedUsers";
import DownloadAllResults from "./DownloadAllResults";
import ProtectedRoute from "../components/ProtectedRoute";

const AdvisingRouter = () => (
  <Switch>
    <Route path={ADVISING_HOME_ROUTE} exact component={AdvisingHome} />
    <Route path={ADVISING_RESULTS_ROUTE} component={AdvisingResults} />
    <Route path={ADVISING_FORM_ROUTE} component={AdvisingForm} />
    <ProtectedRoute
      requiresAdmin={true}
      path={ADVISED_USERS_ROUTE}
      component={AdvisedUsers}
    />
    <ProtectedRoute
      requiresAdmin={true}
      path={DOWNLOAD_ALL_RESULTS_ROUTE}
      component={DownloadAllResults}
    />
  </Switch>
);

export { ADVISING_FORM_ROUTE, ADVISING_HOME_ROUTE, ADVISING_RESULTS_ROUTE };

export default AdvisingRouter;
