import "./App.css";
import { Redirect, Route, Switch, HashRouter } from "react-router-dom";
import {AdminCatalog} from "./admin";
import {AdminView} from "./admin";
import {AdminMajors} from "./admin";
import { ADMIN_HOME_ROUTE }from "./admin" 
import { AboutUs, ContactUs, Footer, Header, Home, NotFound } from "./common";
import {
  ABOUT_US_ROUTE,
  CONTACT_US_ROUTE,
  HOME_ROUTE,
  NOT_FOUND_ROUTE,
} from "./common";

import { Profile, Logout, LOGOUT_ROUTE, PROFILE_ROUTE } from "./profile";

import AdvisingRouter, { ADVISING_HOME_ROUTE } from "./advising";
import AccountRouter, { ACCOUNT_ROUTE } from "./account";

import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminCatalogView from "./admin/AdminCatalogView";
import AdminCreateCatalog from "./admin/AdminCreateCatalog";
// import AdminCreateCatalog from "./admin/AdminCreateCatalog";
function App() {
  const user = useAuth(true);

  // console.log(process.env)
  return (
    <HashRouter>
      <div className="page-container">
        <Header user={user} />

        <Switch>
          <Route
            path={HOME_ROUTE}
            exact
            render={(props) => <Home {...props} user={user} />}
          />
          <Route>
            <main className="container content-wrapper">
              <Switch>
                <ProtectedRoute
                  path={ADVISING_HOME_ROUTE}
                  component={AdvisingRouter}
                
                />
                
                <ProtectedRoute
                   path={'/admin/catalogs/:majorId'}
                   component={AdminCatalog}
                   requiresAdmin = {true}
                />
                <ProtectedRoute
                   path={'/admin/catalog/:catalogId'}
                   component={AdminCatalogView}
                   requiresAdmin = {true}
                />
                <ProtectedRoute
                   path={'/admin/createcatalog'}
                   component={AdminCreateCatalog}
                   requiresAdmin = {true}
                />
                <ProtectedRoute
                   path={'/admin/major'}
                   component={AdminMajors}
                   requiresAdmin = {true}
                />
                <ProtectedRoute
                  path={ADMIN_HOME_ROUTE}
                  component={AdminView}
                  requiresAdmin = {true}
                />
        
                <Route path={ACCOUNT_ROUTE} component={AccountRouter} />
              
                <ProtectedRoute path={PROFILE_ROUTE} component={Profile} />
                <Route path={LOGOUT_ROUTE} component={Logout} />

                <Route path={CONTACT_US_ROUTE} component={ContactUs} />
                <Route path={ABOUT_US_ROUTE} component={AboutUs} />

                <Route exact path={NOT_FOUND_ROUTE} component={NotFound} />
                <Redirect to={{ pathname: { NOT_FOUND_ROUTE } }} />
              </Switch>
            </main>
          </Route>
          <Route path={NOT_FOUND_ROUTE} component={NotFound} />
        </Switch>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
