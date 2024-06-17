// src/components/RoundCard.jsx
import React from 'react';
import '../App.css';

const HomeDescriptions = {
  1: 'Tournament',
  2: 'Practice',
};

const RoundCard = ({ feature, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(feature)}>
      <div className="cardContent">
        <h3>{feature}</h3>
        <p>{HomeDescriptions[feature]}</p>
      </div>
    </div>
  );
};

export default RoundCard;
