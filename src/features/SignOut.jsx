import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseconfig";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button type="button" onClick={handleSignOut}>
        Sign Out
      </button>
    </>
  );
};

export default SignOut;
