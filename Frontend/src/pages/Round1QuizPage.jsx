// src/pages/Round1QuizPage.jsx
import React, { useState } from 'react';
import '../App.css';

const Round1QuizPage = ({ players, onBack }) => {
  const [scores, setScores] = useState(players.map(() => 0));

  const handleAnswerClick = (index) => {
    const newScores = [...scores];
    newScores[index] += 1;
    setScores(newScores);
  };

  return (
    <div className="round1QuizPage">
      <button onClick={onBack}>Back</button>
      <div className="playersScores">
        {players.map((player, index) => (
          <div key={index} className="playerScore">
            {player}: {scores[index]}
          </div>
        ))}
      </div>
      <div className="animation">
        <img src="path/to/animation.gif" alt="Speaking Animation" />
      </div>
      <AudioRecorder />
      <div className="answerButtons">
        {players.map((player, index) => (
          <button key={index} onClick={() => handleAnswerClick(index)}>
            Answer
          </button>
        ))}
      </div>
    </div>
  );
};

export default Round1QuizPage;
