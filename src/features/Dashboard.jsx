import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebaseconfig";
import { Link } from "react-router-dom";
import SignOut, { BackButton } from "./SignOut";
// import { db, auth } from "../config/firebaseconfig";
import { doc, getDocs, addDoc, collection } from "firebase/firestore";
import Pagination from "./pagination/Pagination";

export const History = () => {
  const [wordHistory, setWordHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(15);
  const wordRef = collection(db, "wordHistory");

  const getWord = async () => {
    try {
      const data = await getDocs(wordRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setWordHistory(filteredData);
      // setTotal(filteredData.length);
    } catch (e) {
      console.log("Error getting document: ", e);
    }
  };
  const currentUserDisplayName = auth.currentUser ? auth.currentUser.uid : null;

  const filteredWordHistory = wordHistory.filter(
    (words) => words.userId === currentUserDisplayName
  );

  useEffect(() => {
    getWord();
    setTotal(filteredWordHistory.length);
  }, []);

  const end = currentPage * limit;
  const start = end - limit;
  return (
    <>
      <div className="wrapper">
        <BackButton />
        <h2>Search History</h2>
        <ul>
          {filteredWordHistory.slice(start, end).map((words) => (
            <li key={words.id}>{words.word}</li>
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          total={total}
          limit={limit}
          onPageChange={(page) => setCurrentPage(page)}
        />
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
