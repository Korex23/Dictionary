import { set } from "date-fns";
import { auth, googleProvider, db, storage } from "../config/firebaseconfig";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // [1
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
      setError(error.message); // [2]
    }
  };

  const handleEmailSignIn = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      navigate("/dictionary");
      // addUsername();
    } catch (error) {
      console.log(error);
      setError(error.message); // [2]
    }
  };

  const userRef = collection(db, "UserData");
  const addUsername = async () => {
    try {
      const docRef = await addDoc(userRef, {
        username: user,
        userId: auth?.currentUser?.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getUsername = async () => {
    try {
      const data = await getDoc(doc(userRef, auth?.currentUser?.uid));
      setUser(data.data().username);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form>
        <p>{error}</p>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
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
          Sign Up
        </button>
        {/* <button type="button" onClick={handleGoogleSignIn}>
          Sign In with Google
        </button> */}
        <Link to="/">Sign In</Link>
      </form>
    </>
  );
};

export default SignIn;
