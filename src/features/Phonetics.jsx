import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./spinner";
import { auth, db, storage } from "../config/firebaseconfig";
import { doc, getDocs, addDoc, collection } from "firebase/firestore";
import AudioPlayer from "./AudioPlayer";
import { BackButton } from "./SignOut";
import { Link } from "react-router-dom";

export const PhoneticsHistory = () => {
  const [wordHistory, setWordHistory] = useState([]);
  const wordRef = collection(db, "phonetics");

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

const Phonetics = () => {
  const [word, setWord] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [phonetics, setPhonetics] = useState([]);
  const [phoneticAudio, setPhoneticAudio] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const DICTIONARY_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  const handleWordChange = (e) => {
    const value = e.target.value;
    setWord(value);
    if (value.trim() === "") {
      setPhonetics([]);
    }
  };
  const fetchWord = async () => {
    try {
      //   setLoading(true);
      const response = await axios.get(DICTIONARY_URL);
      const data = response.data[0];
      setPhonetics(data.phonetics);
      setPhoneticAudio(data.phonetics[0].audio);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("No such word");
    }
  };

  const wordRef = collection(db, "phonetics");

  const getWord = async () => {
    try {
      const data = await getDocs(wordRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setHistory(filteredData);
    } catch (e) {
      console.log("Error getting document: ", e);
    }
  };

  const addWord = async () => {
    try {
      const docRef = await addDoc(wordRef, {
        word: word,
        userId: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
      });
      console.log(auth?.currentUser?.uid);
      console.log("Document written with ID: ", docRef.id);
      getWord();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWord();
    if (word !== "") {
      addWord();
    } else {
      return null;
    }
    // setWord("");
  };

  useEffect(() => {
    getWord();
    fetchWord();
  }, []);

  return (
    <>
      <div className="wrapper">
        <BackButton />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for a word phonetic details"
            value={word}
            onChange={handleWordChange}
          />
          <button type="submit">Search</button>
        </form>
        {loading && <Spinner />}
        <p>{error}</p>
        {phonetics.map((phonetic) => (
          <div key={phonetic.text}>
            <p>{phonetic.text}</p>
            {phoneticAudio.length > 0 && <AudioPlayer src={phoneticAudio} />}

            {/* <AudioPlayer src={phonetic.audio} /> */}
          </div>
        ))}
        <Link to={"/phonetics-history"}>
          <button className="btn-style">History</button>
        </Link>
      </div>
    </>
  );
};

export default Phonetics;
