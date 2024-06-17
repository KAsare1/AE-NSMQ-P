import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shuffleIcon from './../assets/shuffle.png'; // Update this path to the actual location of your shuffle icon

const rounds = [
  { id: 1, name: 'Fundamental Concepts' },
  { id: 2, name: 'Speed Race' },
  { id: 4, name: 'True or False' },
  { id: 5, name: 'Riddles' },
];

const Practice = () => {
  const navigate = useNavigate();
  const [lastClickedRound, setLastClickedRound] = useState(null);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [lastVisit, setLastVisit] = useState(null);

  useEffect(() => {
    const storedLastClickedRound = localStorage.getItem('lastClickedRound');
    if (storedLastClickedRound) {
      setLastClickedRound(parseInt(storedLastClickedRound, 10));
    }

    const storedLastVisit = localStorage.getItem('lastVisit');
    const storedStreak = localStorage.getItem('dailyStreak');
    if (storedLastVisit) {
      const lastVisitDate = new Date(storedLastVisit);
      const today = new Date();
      const differenceInDays = Math.floor((today - lastVisitDate) / (1000 * 60 * 60 * 24));

      if (differenceInDays === 1) {
        setDailyStreak(parseInt(storedStreak, 10) + 1);
      } else if (differenceInDays > 1) {
        setDailyStreak(1); // Reset streak if more than a day has passed
      } else {
        setDailyStreak(parseInt(storedStreak, 10));
      }
    } else {
      setDailyStreak(1); // First visit
    }

    setLastVisit(new Date());
  }, []);

  useEffect(() => {
    if (lastVisit) {
      localStorage.setItem('lastVisit', lastVisit);
      localStorage.setItem('dailyStreak', dailyStreak);
    }
  }, [lastVisit, dailyStreak]);

  const handleRoundClick = (roundId, roundName) => {
    setLastClickedRound(roundId);
    localStorage.setItem('lastClickedRound', roundId);
    navigate('/practice-round-start', { state: { round: roundId, roundName } });
  };

  const handleShuffleClick = () => {
    const randomRound = rounds[Math.floor(Math.random() * rounds.length)];
    handleRoundClick(randomRound.id, randomRound.name);
  };

  const sortedRounds = lastClickedRound
    ? [rounds.find(r => r.id === lastClickedRound), ...rounds.filter(r => r.id !== lastClickedRound)]
    : rounds;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative p-10">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 z-10"
      >
        Back
      </button>

      <div className="text-center p-10 bg-white shadow-lg rounded-lg w-full max-w-6xl relative">
        <section className="absolute top-4 right-4 bg-white shadow-md rounded-lg p-4">
          <div className="text-xl font-bold">
            <span>{dailyStreak} {dailyStreak === 1 ? 'day' : 'days'} <span role="img" aria-label="fire">🔥</span></span>
          </div>
          <div className="text-sm">Current streak</div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold">Practice Mode</h2>
        </section>

        <section className="w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Pick up where you left off</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedRounds.map(round => (
              <div key={round.id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold mb-4">{round.name}</h2>
                <button
                  onClick={() => handleRoundClick(round.id, round.name)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Start Round {round.id}
                </button>
              </div>
            ))}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold mb-4">Shuffle</h2>
              <button
                onClick={handleShuffleClick}
                className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                <img src={shuffleIcon} alt="Shuffle" className="w-6 h-6 mr-2" />
                Random Round
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Practice;
