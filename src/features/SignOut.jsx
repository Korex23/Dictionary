import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseconfig";
import { useNavigate, Link } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button type="button" className="btn-style" onClick={handleSignOut}>
        Sign Out
      </button>
    </>
  );
};
export const BackButton = () => {
  return (
    <Link to={-1}>
      <button className="btn-style" style={{ marginBottom: "10px" }}>
        Go back
      </button>
    </Link>
  );
};

export default SignOut;
