// src/components/Result.js
import React from 'react';

const Result = ({ totalQuestions, correctAnswers, incorrectAnswers }) => {
  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Total Questions: {totalQuestions}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Incorrect Answers: {incorrectAnswers}</p>
    </div>
  );
};

export default Result;
