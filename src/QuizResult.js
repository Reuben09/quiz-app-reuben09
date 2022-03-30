import React, { useState, useEffect } from "react";
import "./styles.css";
import Winner from "./images/winner.svg";

export default function QuizResult({
  score,
  setDisableButton,
  setIsEnd,
  setScore,
  fetchApi
}) {
  const handleTryAgain = () => {
    fetchApi();
    setScore(0);
    setIsEnd(false);
    setDisableButton(false);
  };
  return (
    <div className="Quiz-container2">
      <img src={Winner} alt="winner" />
      <p className="result">Results</p>
      <p className="result2">
        you got <span className="span-color">{score}</span> correct answers
      </p>
      <button onClick={() => handleTryAgain()} className="try-again">
        Try again
      </button>
    </div>
  );
}
