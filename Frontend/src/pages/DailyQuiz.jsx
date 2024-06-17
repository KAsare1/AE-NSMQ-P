import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DailyQuiz = () => {
    const [contestants, setContestants] = useState(3);
    const [difficulty, setDifficulty] = useState('easy');
    const navigate = useNavigate();
  
    const handleStart = () => {
      navigate('/fixtures', { state: { contestants, difficulty } });
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
          <h1 className="text-4xl font-bold mb-8">Tournament Setup</h1>
          
          <div className="mb-6">
            <label className="block mb-2 text-lg font-semibold">Number of Contestants</label>
            <input
              type="number"
              value={contestants}
              onChange={(e) => setContestants(Math.min(Math.max(1, parseInt(e.target.value)), 3))}
              min="1"
              max="3"
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>
  
          <div className="mb-6">
            <label className="block mb-2 text-lg font-semibold">Difficulty Level</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
  
          <button
            onClick={handleStart}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Generate Fixtures
          </button>
        </div>
      </div>
    );
  };

export default DailyQuiz