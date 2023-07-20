import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseconfig";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShowPassWordIcon, HidePassWordIcon } from "./SignIn";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // [1
  const [passwordToggle, setpasswordToggle] = useState(false);
  const navigate = useNavigate();

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // history.push("/");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError(error.message); // [2]
    }
  };

  const handleShowHide = (e) => {
    setpasswordToggle(!passwordToggle);
    e.preventDefault();
  };

  return (
    <>
      <form className="auth-form">
        <p>{error}</p>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex-it">
          <input
            type={passwordToggle ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="border rounded-end border-start-0 px-2 bg-transparent mb-1"
            onClick={handleShowHide}
          >
            {passwordToggle ? <HidePassWordIcon /> : <ShowPassWordIcon />}
          </button>
        </div>
        <button type="button" className="btn-style" onClick={handleEmailSignIn}>
          Sign In
        </button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p>
          Forgotten your password?
          <Link to="/forgotpassword">Forgotten Password</Link>
        </p>
      </form>
    </>
  );
};

export default SignIn;
