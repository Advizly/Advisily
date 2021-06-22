import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import CoursesFormSecond from "./components/CoursesFormSecond";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignupForm";
import AdvisingForm from "./components/advisingForm/AdvisingForm";
function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <Header />
        <Route path="/" exact component={Home} />

        <main className="container content-wrapper">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/courses-form" component={AdvisingForm} />
            <Route path="/courses-form-test" component={CoursesFormSecond} />
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
