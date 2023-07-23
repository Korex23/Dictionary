import React, { useState, useEffect } from "react";
import axios from "axios";
// import { set } from "date-fns";
import Spinner from "./spinner";
import "./Dictionary.css";
import AudioPlayer from "./AudioPlayer";
import SignOut, { BackButton } from "./SignOut";
import { db, auth } from "../config/firebaseconfig";
import { doc, getDocs, addDoc, collection } from "firebase/firestore";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [phonetics, setPhonetics] = useState([]);
  const [phonetic, setPhonetic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [wordHistory, setWordHistory] = useState([]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // const userRef = collection(db, "UserData");
  // console.log(auth?.currentUser?.displayName);

  const DICTIONARY_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const RANDOM_WORD_URL = "https://random-word-api.herokuapp.com/word?number=1";

  const handleWordChange = (e) => {
    const value = e.target.value;
    setWord(value);
    if (value.trim() === "") {
      setMeanings([]);
      setPhonetics([]);
      setPhonetic({});
    }
  };

  const fetchRandomWord = async () => {
    try {
      setLoading(true);
      const response = await axios.get(RANDOM_WORD_URL);
      const randomWord = response.data[0];
      setWord(randomWord);
      fetchWord(randomWord);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch random word");
    }
  };

  const fetchWord = async (selectedWord) => {
    try {
      setLoading(true);
      const url = selectedWord
        ? `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`
        : DICTIONARY_URL;
      const response = await axios.get(url);
      const data = response.data[0];
      setMeanings(data.meanings);
      setPhonetics(data.phonetics);
      setPhonetic(data.phonetics[0]);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("No word found");
    }
  };

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

  const addWord = async () => {
    try {
      const docRef = await addDoc(wordRef, {
        word: word,
        userId: auth?.currentUser?.uid,
        displayName: auth?.currentUser?.displayName,
      });
      console.log(auth?.currentUser?.uid);
      console.log("Document written with ID: ", docRef.id);
      getWord();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    fetchRandomWord();
    getWord();
  }, []);

  const handleWordSubmit = (e) => {
    e.preventDefault();
    fetchWord();
    // setWord("");
    if (word !== "") {
      addWord();
    } else {
      return null;
    }
  };
  const currentUserDisplayName = auth.currentUser
    ? auth.currentUser.displayName
    : null;

  // Filter wordHistory to only include items with matching displayName
  const filteredWordHistory = wordHistory.filter(
    (words) => words.displayName === currentUserDisplayName
  );

  const Modal = () => {
    return (
      <div style={{ marginTop: "10px" }}>
        <button className="btn-style" onClick={openModal}>
          History
        </button>

        {isOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>Search History</h4>
                <button className="btn-style" onClick={closeModal}>
                  Close
                </button>
              </div>
              <ul>
                {filteredWordHistory.map((words) => (
                  <li key={words.id}>{words.word}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };
  const WordDetails = () => {
    return (
      <>
        <h1>{word}</h1>
        <div>
          {phonetics.length ? (
            <>
              <p>{phonetic.text}</p>
              {/* <audio controls>
                <source src={phonetic.audio} type="audio/mpeg" />
              </audio> */}
              <AudioPlayer src={phonetic.audio} />
            </>
          ) : null}
        </div>

        {meanings.map((meaning) => (
          <div>
            <h2>{meaning.partOfSpeech}</h2>
            {meaning.definitions.map((definition) => (
              <div>
                <ul>
                  <li>{definition.definition}</li>
                </ul>
                <ul>
                  {definition.synonyms.map((synonym) => {
                    return <li>{synonym}</li>;
                  })}
                </ul>
                <ul>
                  {definition.antonyms.map((antonym) => {
                    return <li>{antonym}</li>;
                  })}
                </ul>
                <p style={{ fontSize: "10px" }}>{definition.example}</p>
              </div>
            ))}
            <ul>
              {meaning.synonyms.length ? <h3>Synonyms</h3> : null}
              {meaning.synonyms.length
                ? meaning.synonyms.map((synonym) => {
                    return <li>{synonym}</li>;
                  })
                : null}
            </ul>
            <ul>
              {meaning.antonyms.length ? <h3>Antonyms</h3> : null}
              {meaning.antonyms.length
                ? meaning.antonyms.map((antonym) => {
                    return <li>{antonym}</li>;
                  })
                : null}
            </ul>
          </div>
        ))}
      </>
    );
  };

  // const content = results.length ? results : <h3>No users found</h3>;
  const content = meanings.length ? <WordDetails /> : <h3>{error}</h3>;
  const noword = word.length ? <h3>No word found</h3> : null;

  //integrate the spinner

  return (
    <div className="wrapper">
      <BackButton />
      <div>
        <input type="text" value={word} onChange={handleWordChange} />
        <button onClick={handleWordSubmit}>Search</button>
        <div className="content">{loading ? <Spinner /> : content}</div>
        {/* {content} */}
      </div>
      <footer>
        <figcaption>
          "Information on this website was gotten from a free database so not
          all words are available"
        </figcaption>
      </footer>
      <SignOut />
      {/* <Modal /> */}
    </div>
  );
};

export default Dictionary;
