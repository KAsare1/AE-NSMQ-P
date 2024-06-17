import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StartTournament = () => {
  const { state } = useLocation();
  const { difficulty, fixtures } = state;
  const navigate = useNavigate();

  const [numContestants, setNumContestants] = useState(1);

  const handleStart = () => {
    navigate('/quiz', { state: { contestants: numContestants } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-10 bg-white shadow-lg rounded-lg">
         {/* Back Button */}
         <button
          onClick={() => navigate('/tournament')}
          className="absolute top-4 left-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
        >
          Back
        </button>
        <h1 className="text-4xl font-bold mb-8">Start Tournament</h1>
        <h2 className="text-2xl font-semibold mb-4">Difficulty: {difficulty}</h2>
        
        <ul className="mb-6">
          {fixtures.map((fixture, index) => (
            <li key={index} className="text-lg mb-2">{fixture}</li>
          ))}
        </ul>

        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">Number of Contestants</label>
          <input
            type="number"
            value={numContestants}
            onChange={(e) => setNumContestants(Math.min(Math.max(1, parseInt(e.target.value)), 3))}
            min="2"
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

export default StartTournament;
