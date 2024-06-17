import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Tournament from './pages/Tournament';
import Practice from './pages/practice';
import Fixtures from './pages/Fixtures';
import StartTournament from './pages/StartTournament';
import Quiz from './pages/TournamentQuiz';
import PracticeRoundStart from './pages/PracticeRoundStart';
import TimedQuiz from './pages/TimedQuiz';
import SurvivalMode from './pages/SurvivalMode';
import Challenge from './pages/Challenge';
import DailyQuiz from './pages/DailyQuiz';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice-round-start" element={<PracticeRoundStart />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/start-tournament" element={<StartTournament />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/timed-quiz" element={<TimedQuiz />} />
        <Route path="/survival-mode" element={<SurvivalMode />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/daily-quiz" element={<DailyQuiz />} />
      </Routes>
    </Router>
  );
};

export default App;
