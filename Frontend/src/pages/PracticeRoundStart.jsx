import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PracticeRoundStart = () => {
  const { state } = useLocation();
  const { round, roundName } = state;
  const navigate = useNavigate();

  const [numContestants, setNumContestants] = useState(1);

  const handleStart = () => {
    navigate('/quiz', { state: { contestants: numContestants, round, roundName } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-10 bg-white shadow-lg rounded-lg">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
        >
          Back
        </button>
        <h1 className="text-4xl font-bold mb-8">{roundName}</h1>
        <h2 className="text-2xl font-semibold mb-4">Round {round}</h2>
        
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">Number of Contestants</label>
          <input
            type="number"
            value={numContestants}
            onChange={(e) => setNumContestants(Math.min(Math.max(1, parseInt(e.target.value)), 3))}
            min="1"
            max="3"
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={handleStart}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Begin
        </button>
      </div>
    </div>
  );
};

export default PracticeRoundStart;
