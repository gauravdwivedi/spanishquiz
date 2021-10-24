import React, { useState, useEffect } from 'react';

import { Questionaire } from './components';

import './App.css';

const API_URL =
  'https://my-json-server.typicode.com/gauravdwivedi/spanishapi/results';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const questions = data.map((question) => ({
          ...question,
          answers: [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }));
        setQuestions(questions);
      });
  }, []);

  const handleAnswer = (answer) => {
    if (!showAnswers) {
      if (answer === questions[currentIndex].correct_answer) {
        setScore(score + 1);
      }
    }

    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setShowAnswers(false);
    setCurrentIndex(currentIndex + 1);
  };

  return questions.length > 0 ? (
    <div className="container">
      <h1 className="text-2xl m-5">Score : {score}</h1>
      {currentIndex >= questions.length ? (
        <h1 className="text-3xl text-white font-bold p-10">
          Game ended! Your score is : {score}
          <h3 className="text-xs">feedback: gauravdwivedi@hotmail.com</h3>
        </h1>
      ) : (
        <Questionaire
          data={questions[currentIndex]}
          handleAnswer={handleAnswer}
          showAnswers={showAnswers}
          handleNextQuestion={handleNextQuestion}
        />
      )}
    </div>
  ) : (
    <h2 className="text-2xl text-white font-bold">Loading...</h2>
  );
}

export default App;
