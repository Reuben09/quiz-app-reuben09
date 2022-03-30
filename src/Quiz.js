import React, { useState, useEffect } from "react";
import QuizResult from "./QuizResult";

export default function Quiz({
  quiz,
  disableButton,
  quizIndex,
  fetchApi,
  setDisableButton,
  handleIndex
}) {
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const quizList = quiz[quizIndex];
  const { question, correct_answer, incorrect_answers } = quizList;
  const quizArray = [correct_answer, ...new Set(incorrect_answers)];

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  let arrQuiz = shuffleArray(quizArray);

  const checkAnswer = (quizItem) => {
    if (quizItem === correct_answer) {
      setIsCorrect(true);
      console.log("coorect");
      console.log(arrQuiz);
      setScore(() => score + 1);
    } else {
      console.log(quizItem);
      setIsCorrect(false);
      console.log("not coorect");
    }
    handleIndex();
  };

  return (
    <div className="overall-quiz-container">
      {!isEnd && (
        <div className="Quiz-container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />

          <div className="quiz-array-container">
            {arrQuiz.map((quizItem) => {
              return (
                <button
                  onClick={() => checkAnswer(quizItem)}
                  key={quizItem}
                  disabled={disableButton}
                  className="neutral"
                  dangerouslySetInnerHTML={{ __html: quizItem }}
                />
              );
            })}
          </div>
          {disableButton && (
            <div onClick={() => setIsEnd(true)} className="endquiz">
              End Quiz
            </div>
          )}
        </div>
      )}
      {isEnd && (
        <QuizResult
          setIsEnd={setIsEnd}
          setScore={setScore}
          fetchApi={fetchApi}
          score={score}
          setDisableButton={setDisableButton}
        />
      )}
    </div>
  );
}
