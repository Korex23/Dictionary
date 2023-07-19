import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth, storage } from "../config/firebaseconfig";

const Modal = ({ word }) => {
  const wordRef = doc(db, "wordHistory");
  const getWord = async () => {
    try {
      const data = await getDocs(wordRef);
      setWord(data.data().word);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  getWord();

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Modal Title</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
            <button onClick={closeModal}>Close Modal</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
