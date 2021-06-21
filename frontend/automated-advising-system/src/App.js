import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import CoursesForm from "./components/CoursesForm";
import CoursesFormSecond from "./components/CoursesFormSecond";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignupForm";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <Header />

        <Switch>
          <Route path="/" exact component={Home} />
          <main className="container content-wrapper">
            <Route path="/login" component={LoginForm} />
            <Route path="/courses-form" component={CoursesForm} />
            <Route path="/courses-form-test" component={CoursesFormSecond} />
            <Route path="/sign-up" component={SignUpForm} />
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/not-found" component={NotFound} />
          </main>
          <Redirect to="/not-found" />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
