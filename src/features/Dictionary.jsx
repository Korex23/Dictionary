import React, { useState, useEffect } from "react";
import axios from "axios";
// import { set } from "date-fns";
import Spinner from "./spinner";
import "./Dictionary.css";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [phonetics, setPhonetics] = useState([]);
  const [phonetic, setPhonetic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchRandomWord();
  }, []);

  const handleWordSubmit = (e) => {
    e.preventDefault();
    fetchWord();
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
                <p>{definition.example}</p>
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
      <div>
        <input type="text" value={word} onChange={handleWordChange} />
        <button onClick={handleWordSubmit}>Search</button>
        <div className="content">{loading ? <Spinner /> : content}</div>
        {/* {content} */}
      </div>
      <footer>
        <figcaption>"Information on this website was gotten from a free database so not all words are available"</figcaption>
      </footer>
    </div>
  );
};

export default Dictionary;
