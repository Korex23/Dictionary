// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebaseconfig";
import { useState } from "react";
import { BackButton } from "./SignOut";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null); // [1
  const navigate = useNavigate();

  const triggerResetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent");
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message); // [2]
    }
  };

  return (
    <div className="auth-form">
      <BackButton />
      <p>{error}</p>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="button" className="btn-style" onClick={triggerResetEmail}>
        Reset password
      </button>
    </div>
  );
};

export default ResetPassword;
