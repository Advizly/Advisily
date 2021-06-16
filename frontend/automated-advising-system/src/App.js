import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
// import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import CoursesForm from "./components/CoursesForm";

function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <NavBar />
        <main className="container content-wrapper">
          {/* <LoginForm /> */}
          <CoursesForm />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
