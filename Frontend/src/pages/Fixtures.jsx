import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Fixtures = () => {
  const { state } = useLocation();
  const { contestants, difficulty } = state;
  const navigate = useNavigate();

  const generateFixtures = (numContestants) => {
    const fixtures = [];
    for (let i = 0; i < numContestants; i += 3) {
      const contestGroup = [];
      for (let j = i; j < i + 3 && j < numContestants; j++) {
        contestGroup.push(`Contestant ${j + 1}`);
      }
      fixtures.push(contestGroup.join(' vs '));
    }
    return fixtures;
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
        <h1 className="text-4xl font-bold mb-8">Tournament Fixtures</h1>
        <h2 className="text-2xl font-semibold mb-4">Difficulty: {difficulty}</h2>
        
        <ul className="mb-6">
          {generateFixtures(contestants).map((fixture, index) => (
            <li key={index} className="text-lg mb-2">{fixture}</li>
          ))}
        </ul>

        <button
          onClick={() => navigate('/start-tournament', { state: { contestants, difficulty, fixtures: generateFixtures(contestants) } })}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Start Tournament
        </button>
      </div>
    </div>
  );
};

export default Fixtures;
