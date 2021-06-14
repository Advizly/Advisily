import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
import SignUpForm from "./components/SignupForm";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="container">
        <SignUpForm />
      </main>
    </BrowserRouter>
  );
}

export default App;
