import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import AdvisingRouter from "./advising/AdvisingRouter";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

import ForgotPassword from "./components/ForgotPassword";
import LoginForm from "./loginForm/LoginForm";
import Logout from "./components/Logout";
import SignUpForm from "./signUpForm/SignupForm";

import Profile from "./components/Profile";

import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <div className="page-container">
        <Header user={user} />

        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <Home {...props} user={user} />}
          />
          <main className="container content-wrapper">
            <Switch>
              <Route path="/forgot-password" component={ForgotPassword} />
              <ProtectedRoute path="/advising" component={AdvisingRouter} />
              <ProtectedRoute path="/me" component={Profile} />
              <Route path="/logout" component={Logout} />
              <Route path="/login" component={LoginForm} />
              <Route path="/sign-up" component={SignUpForm} />
              <Route path="/contact-us" component={ContactUs} />
              <Route path="/about-us" component={AboutUs} />
              <Route exact path="/not-found" component={NotFound} />
              <Redirect to={{ pathname: "/not-found" }} />
            </Switch>
          </main>
        </Switch>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
