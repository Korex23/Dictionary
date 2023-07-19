import React, { useState, useRef, useEffect } from "react";

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.currentTime = 0; // Rewind to the beginning
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleAudioEnd = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleAudioEnd);

    return () => {
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, []);

  return (
    <div>
      <button
        onClick={togglePlay}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          outline: "none",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isPlaying ? "#ff0000" : "#000000"}
          width="24px"
          height="24px"
        >
          {isPlaying ? (
            <path d="M6 4h2v16H6zm10 0h2v16h-2z" />
          ) : (
            <path d="M8 5v14l11-7z" />
          )}
        </svg>
      </button>
      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default AudioPlayer;
