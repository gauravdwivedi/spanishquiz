import React from 'react';

const Questionaire = ({
  handleNextQuestion,
  showAnswers,
  handleAnswer,
  data: { question, correct_answer, answers },
}) => {
  return (
    <div className="flex flex-col m-5 p-5">
      <div
        className="bg-white text-purple-800 p-10
        rounded-lg shadow-md mb-2"
      >
        <h2
          className=" text-1xl "
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        {answers.map((answer, idx) => {
          const bgColor = showAnswers
            ? answer === correct_answer
              ? 'bg-green-500'
              : 'bg-red-500'
            : 'bg-white';
          const textColor = showAnswers ? 'text-white' : 'text-purple-800';
          return (
            <button
              key={idx}
              className={`${bgColor} ${textColor} p-4  font-semibold rounded shadow `}
              onClick={() => handleAnswer(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
      </div>
      {showAnswers && (
        <button
          onClick={handleNextQuestion}
          className={`ml-auto bg-purple-700 text-white p-4 font-semibold rounded shadow mt-6 `}
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default Questionaire;
