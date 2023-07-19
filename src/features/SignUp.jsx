import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseconfig";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // [1
  const navigate = useNavigate();

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // history.push("/");
      navigate("/dictionary");
    } catch (error) {
      console.log(error);
      setError(error.message); // [2]
    }
  };

  return (
    <>
      <form>
        <p>{error}</p>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleEmailSignIn}>
          Sign In
        </button>
        <Link to="/signup">Sign Up</Link>
        <Link to="/forgotpassword">Forgot Password</Link>
      </form>
    </>
  );
};

export default SignIn;
