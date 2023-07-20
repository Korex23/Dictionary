import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebaseconfig";
import { Link } from "react-router-dom";
import SignOut, { BackButton } from "./SignOut";
// import { db, auth } from "../config/firebaseconfig";
import { doc, getDocs, addDoc, collection } from "firebase/firestore";

export const History = () => {
  const [wordHistory, setWordHistory] = useState([]);
  const wordRef = collection(db, "wordHistory");

  const getWord = async () => {
    try {
      const data = await getDocs(wordRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setWordHistory(filteredData);
    } catch (e) {
      console.log("Error getting document: ", e);
    }
  };

  useEffect(() => {
    getWord();
  }, []);

  const currentUserDisplayName = auth.currentUser ? auth.currentUser.uid : null;

  const filteredWordHistory = wordHistory.filter(
    (words) => words.userId === currentUserDisplayName
  );

  return (
    <>
      <div className="wrapper">
        <BackButton />
        <h2>Search History</h2>
        <ul>
          {filteredWordHistory.map((words) => (
            <li key={words.id}>{words.word}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

const Dashboard = () => {
  const user = auth.currentUser;
  const [username, setUsername] = useState();
  useEffect(() => {
    setUsername(user.displayName);
  });

  return (
    <>
      <div className="wrapper">
        <h1>Dashboard</h1>
        <h3>Welcome, {username}</h3>
        <Link to={"/dictionary"}>
          <button className="btn-style">Dictionary</button>
        </Link>
        <Link to={"/history"}>
          <button
            className="btn-style"
            style={{ display: "block", marginTop: "10px" }}
          >
            History
          </button>
        </Link>
        <Link to={"/phonetics"}>
          <button
            className="btn-style"
            style={{ display: "block", marginTop: "10px" }}
          >
            Phonetics
          </button>
        </Link>
        {/* <History /> */}
        <div style={{ marginTop: "10px" }}>
          <SignOut />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
