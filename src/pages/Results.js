// src/pages/Results.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Result from '../components/Result';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuestions, correctAnswers, incorrectAnswers } = location.state || {
    totalQuestions: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
  };

  const handleRestart = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <Result
        totalQuestions={totalQuestions}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
      />
      <button onClick={handleRestart}>Restart Quiz</button>
    </div>
  );
};

export default Results;
