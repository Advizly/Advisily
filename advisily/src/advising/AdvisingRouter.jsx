import { Route, Switch } from "react-router-dom";
import { AdvisingHome, AdvisingForm, AdvisingResults } from "./";

const AdvisingRouter = () => (
  <Switch>
    <Route path="/advising" exact component={AdvisingHome} />
    <Route path="/advising/results" component={AdvisingResults} />
    <Route path="/advising/form" component={AdvisingForm} />
  </Switch>
);

export default AdvisingRouter;
