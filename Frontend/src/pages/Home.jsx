import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-10 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-8">Welcome to NSMQ Quiz App</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Tournament</h2>
            <p className="mb-6">Join a tournament to compete with others.</p>
            <Link to="/tournament">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Start Tournament
              </button>
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Practice</h2>
            <p className="mb-6">Practice questions to improve your skills.</p>
            <Link to="/practice">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Start Practice
              </button>
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Timed Quiz</h2>
            <p className="mb-6">Answer questions within a time limit.</p>
            <Link to="/timed-quiz">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Start Timed Quiz
              </button>
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Survival Mode</h2>
            <p className="mb-6">Keep answering until you get one wrong.</p>
            <Link to="/survival-mode">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Start Survival Mode
              </button>
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Challenge a Friend</h2>
            <p className="mb-6">Challenge a friend and compare scores.</p>
            <Link to="/challenge">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Start Challenge
              </button>
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Daily Quiz</h2>
            <p className="mb-6">Answer new questions every day.</p>
            <Link to="/daily-quiz">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Start Daily Quiz
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
