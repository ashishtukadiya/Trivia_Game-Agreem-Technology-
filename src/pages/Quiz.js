// src/pages/Quiz.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Question from '../components/Question';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [questionData, setQuestionData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const navigate = useNavigate();

  const fetchQuestion = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=1');
      const data = response.data.results[0];
      setQuestionData({
        question: data.question,
        correct_answer: data.correct_answer,
        incorrect_answers: data.incorrect_answers,
      });
      setShowAnswer(false);
      setSelectedAnswer('');
    } catch (error) {
      console.error('Failed to fetch question:', error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [currentQuestion]);

  const handleAnswerSubmit = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questionData.correct_answer) {
      setCorrectCount(correctCount + 1);
    } else {
      setIncorrectCount(incorrectCount + 1);
    }
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      navigate('/results', {
        state: {
          totalQuestions: 10,
          correctAnswers: correctCount,
          incorrectAnswers: incorrectCount,
        },
      });
    }
  };

  if (!questionData) return <p>Loading...</p>;

  const options = [...questionData.incorrect_answers, questionData.correct_answer].sort();

  return (
    <div className="container">
      <Question
        question={questionData.question}
        options={options}
        correctAnswer={questionData.correct_answer}
        onSubmit={handleAnswerSubmit}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      {showAnswer && (
        <div className="result-message">
          {selectedAnswer === questionData.correct_answer ? (
            <p className="correct">Correct!</p>
          ) : (
            <p className="wrong">
              Wrong! The correct answer is{' '}
              <span dangerouslySetInnerHTML={{ __html: questionData.correct_answer }}></span>
            </p>
          )}
          <button onClick={handleNextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
