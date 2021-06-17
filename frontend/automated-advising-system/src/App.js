import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import CoursesForm from "./components/CoursesForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignupForm";

function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <Header />
        <main className="container content-wrapper">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/courses-form" component={CoursesForm} />
            <Route path="/sign-up" component={SignUpForm} />
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
