import Dictionary from "./features/Dictionary";
import SignIn from "./features/SignIn";
import Spinner from "./features/spinner";
import SignUp from "./features/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import ResetPassword from "./features/ForgotPassword";

function App() {
  return (
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
      </Routes>
    </Router>
  );
}

export default App;
