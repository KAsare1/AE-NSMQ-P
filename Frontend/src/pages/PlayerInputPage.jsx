// src/pages/PlayerInputPage.jsx
import React, { useState } from 'react';
import '../App.css';

const PlayerInputPage = ({ round, onBack, onStart }) => {
  const [playerCount, setPlayerCount] = useState(0);
  const [playerNames, setPlayerNames] = useState([]);

  const handlePlayerCountChange = (e) => {
    const count = Math.min(3, parseInt(e.target.value, 10)); // Max 3 players
    setPlayerCount(count);
    setPlayerNames(Array(count).fill(''));
  };

  const handleNameChange = (index, name) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = name;
    setPlayerNames(newPlayerNames);
  };

  const handleStart = () => {
    onStart(playerNames);
  };

  return (
    <div className="playerInputPage">
      <button onClick={onBack}>Back</button>
      <h1>Round {round}</h1>
      <label>
        Number of players:
        <input type="number" value={playerCount} onChange={handlePlayerCountChange} />
      </label>
      {Array.from({ length: playerCount }, (_, index) => (
        <div key={index}>
          <label>
            Player {index + 1} name:
            <input
              type="text"
              value={playerNames[index]}
              onChange={(e) => handleNameChange(index, e.target.value)}
            />
          </label>
        </div>
      ))}
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default PlayerInputPage;
