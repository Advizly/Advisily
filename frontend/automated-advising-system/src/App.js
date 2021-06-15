import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="container">
        <LoginForm />
      </main>
    </BrowserRouter>
  );
}

export default App;
