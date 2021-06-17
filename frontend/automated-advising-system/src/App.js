import "./App.css";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignupForm";
import Footer from "./components/Footer";
import CoursesForm from "./components/CoursesForm";

function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <NavBar />
        <main className="container content-wrapper">
          <LoginForm />
          <SignUpForm />
          <CoursesForm />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
