// src/components/Question.js
import React from "react";

const Question = ({
  question,
  options,
  onSubmit,
  selectedAnswer,
  setSelectedAnswer,
}) => {
  const handleSubmit = () => {
    if (!selectedAnswer) {
      alert("Please select an answer!");
      return;
    }
    onSubmit(selectedAnswer);
  };

  return (
    <div className="container">
      <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
      <div className="options">
        {options.map((option, index) => (
          <label className="option" key={index}>
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
            <span dangerouslySetInnerHTML={{ __html: option }}></span>
          </label>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Question;
