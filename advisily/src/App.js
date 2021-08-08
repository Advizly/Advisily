import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/signUp/SignupForm";
import ForgotPassword from "./components/ForgotPassword";
import {
  AdvisingHome,
  AdvisingForm,
  AdvisingResults,
} from "./components/advising";
function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <Header />

        <Route path="/" exact component={Home} />

        <main className="container content-wrapper">
          <Switch>
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/advising/results" component={AdvisingResults} />
            <Route path="/advising/form" component={AdvisingForm} />
            <Route path="/advising" component={AdvisingHome} />
            <Route path="/login" component={LoginForm} />
            <Route path="/sign-up" component={SignUpForm} />
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/about-us" component={AboutUs} />
          </Switch>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
