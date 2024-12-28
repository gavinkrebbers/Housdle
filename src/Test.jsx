import { useEffect, useState } from "react";
import wordsList from "./words.json";
function Test() {
  const [randomWord, setRandomWord] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    setRandomWord(wordsList[randomIndex]);
  }, []);

  return (
    <>
      <p>this is a test</p>
      <p>{randomWord}</p>
    </>
  );
}

export default Test;
