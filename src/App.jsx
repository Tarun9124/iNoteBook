import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Router>
          <NavBar showAlert={showAlert} />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
