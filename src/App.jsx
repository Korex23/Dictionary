import Dictionary from "./features/Dictionary";
import SignIn from "./features/SignIn";
import Spinner from "./features/spinner";
import SignUp from "./features/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import ResetPassword from "./features/ForgotPassword";
import Dashboard, { History } from "./features/Dashboard";
import Phonetics, { PhoneticsHistory } from "./features/Phonetics";
import "./features/Dictionary.css";
import { createContext, useState } from "react";
import ReactSwitch from "react-switch";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signup" element={<SignIn />} />
            <Route path="forgotpassword" element={<ResetPassword />} />
            <Route
              path="/dictionary"
              element={
                <PrivateRoute>
                  <Dictionary />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoute>
                  <History />
                </PrivateRoute>
              }
            />
            <Route
              path="/phonetics"
              element={
                <PrivateRoute>
                  <Phonetics />
                </PrivateRoute>
              }
            />
            <Route
              path="phonetics-history"
              element={
                <PrivateRoute>
                  <PhoneticsHistory />
                </PrivateRoute>
              }
            />
          </Routes>
          <div className="switch">
            <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
          </div>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
