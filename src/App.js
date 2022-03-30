import React, { useState, useEffect } from "react";
import "./styles.css";
import Quiz from "./Quiz.js";
import Loading from "./Loading.js";
import Undraw from "./images/undraw.svg";

const ApiUrl = `https://opentdb.com/api.php?amount=20&category=21&difficulty=easy&type=multiple`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [quizIndex, setQuizindex] = useState(0);

  const fetchApi = async () => {
    const response = await fetch(ApiUrl);
    const tours = await response.json();
    setQuiz(tours.results);
    console.log(tours.results);
    setLoading(false);
    setQuizindex(0);
  };
  const checkNumber = (number) => {
    if (number === 19) {
      setDisableButton(true);
    }
    return number;
  };

  const handleIndex = () => {
    setQuizindex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
    console.log(quizIndex);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="App">
        <div className="header-container">
          <h1>Sport quiz</h1>
          <img src={Undraw} alt="undraw" />
        </div>
        <Quiz
          quiz={quiz}
          fetchApi={fetchApi}
          quizIndex={quizIndex}
          handleIndex={handleIndex}
          disableButton={disableButton}
          setDisableButton={setDisableButton}
        />
      </div>
    );
  }
}
