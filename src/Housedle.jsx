"use client";

import { useEffect, useState } from "react";
import PopUp from "./PopUp";
import wordsList from "./words.json";

const MAX_ATTEMPTS = 6;
let hasWon = true;

export default function Housedle() {
  const [answer, setAnswer] = useState("");
  const [userInput, setUserInput] = useState("");
  const [colors, setColors] = useState([]);
  const [guessedChars, setGuessedChars] = useState([]);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    const selectedAnswer = wordsList[randomIndex];
    setAnswer(selectedAnswer);

    // Initialize colors and guessedChars based on the word length
    const wordLength = selectedAnswer.length;
    setColors(Array(MAX_ATTEMPTS).fill(Array(wordLength).fill("bg-gray-200")));
    setGuessedChars(Array(MAX_ATTEMPTS).fill(Array(wordLength).fill("")));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && userInput.length === answer.length) {
        checkAnswer();
      } else if (e.key === "Backspace") {
        setUserInput((prev) => prev.slice(0, -1));
      } else if (
        userInput.length < answer.length &&
        e.key.length === 1 &&
        /^[a-zA-Z]$/.test(e.key)
      ) {
        setUserInput((prev) => (prev + e.key).toUpperCase());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [userInput, answer]);

  const checkAnswer = () => {
    if (userInput.length !== answer.length) return;
    hasWon = true;
    const newColorRow = userInput.split("").map((char, index) => {
      if (char.toLowerCase() == answer[index]) return "bg-green-500";
      if (answer.includes(char.toLowerCase())) {
        hasWon = false;
        return "bg-yellow-500";
      }
      hasWon = false;
      return "bg-gray-400";
    });

    setColors((prev) => {
      const updated = [...prev];
      updated[attempt] = newColorRow;
      return updated;
    });

    setGuessedChars((prev) => {
      const updated = [...prev];
      updated[attempt] = userInput.split("");
      return updated;
    });
    console.log(hasWon);
    if (hasWon) {
      setPopUpVisible(true);
    } else if (!hasWon && attempt + 1 == MAX_ATTEMPTS) {
      setPopUpVisible(true);
    }
    setUserInput("");
    setAttempt((prev) => prev + 1);
  };

  const resetGame = () => {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    const selectedAnswer = wordsList[randomIndex];
    setAnswer(selectedAnswer);

    const wordLength = selectedAnswer.length;
    setColors(Array(MAX_ATTEMPTS).fill(Array(wordLength).fill("bg-gray-200")));
    setGuessedChars(Array(MAX_ATTEMPTS).fill(Array(wordLength).fill("")));
    setPopUpVisible(false);
    setUserInput("");
    setAttempt(0);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-12 overflow-hidden sm:px-6 lg:px-8">
      <PopUp
        visible={popUpVisible}
        onClose={resetGame}
        hasPlayerWon={hasWon ? true : false}
        answer={answer}
      />
      <h1 className="mb-4 text-6xl font-extrabold tracking-tight text-gray-900">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Housedle
        </span>
      </h1>
      <p className="max-w-2xl mb-8 text-xl font-semibold text-center text-gray-700">
        A wordle clone that only uses words said in the hit tv show houseMD
      </p>

      <p className="mb-6 text-2xl font-semibold text-gray-700">
        User Input: <span className="text-blue-600">{userInput}</span>
      </p>
      <div className="w-full max-w-md">
        {colors.map((rowColors, row) => (
          <div className="flex justify-center mb-4" key={row}>
            {rowColors.map((color, col) => (
              <div
                className={`w-14 h-14 border-2 border-gray-300 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-800 mx-1 ${color} transition-colors duration-300`}
                key={col}
              >
                {row === attempt ? userInput[col] : guessedChars[row][col]}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={checkAnswer}
        className="px-6 py-3 mt-8 font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        Submit Guess
      </button>
    </div>
  );
}
