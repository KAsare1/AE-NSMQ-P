// src/components/RoundCard.jsx
import React from 'react';
import '../App.css';

const roundDescriptions = {
  1: 'Fundamental Concepts',
  2: 'Speed Race',
  4: 'True or False',
  5: 'Riddles',
};

const RoundCard = ({ round, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(round)}>
      <div className="cardContent">
        <h3>Round {round}</h3>
        <p>{roundDescriptions[round]}</p>
      </div>
      <button className="playButton">▶</button>
    </div>
  );
};

export default RoundCard;
