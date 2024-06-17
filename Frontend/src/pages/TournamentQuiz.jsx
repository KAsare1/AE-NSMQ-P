import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import recording_animation from './../assets/recording_animation.gif';
import AudioRecorder from '../components/AudioRecorder';

const Quiz = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { contestants } = state;
  const [activeContestant, setActiveContestant] = useState(0);
  const [timer, setTimer] = useState(30);
  const [scores, setScores] = useState(Array(contestants).fill(0));
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [gifKey, setGifKey] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/round1/quiz');
        setQuestions(response.data.questions);
        setCurrentQuestion(response.data.questions[0]);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          handleNextContestant();
          return 30;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeContestant]);

  useEffect(() => {
    const gifInterval = setInterval(() => {
      setGifKey((prevKey) => prevKey + 1);
    }, 3000);

    return () => clearInterval(gifInterval);
  }, []);

  const handleNextContestant = () => {
    setActiveContestant((prev) => {
      const next = (prev + 1) % contestants;
      setCurrentQuestion(questions[next]);
      return next;
    });
  };

  const handleSubmitAnswer = async () => {
    const userAnswer = ""; // Get the contestant's answer from your input or state
    const correctAnswer = currentQuestion.Answer;

    try {
      const response = await axios.post('http://localhost:8000/api/round1/check-answer', {
        user_answer: userAnswer,
        correct_answer: correctAnswer
      });
      if (response.data.result === 'Correct') {
        setScores((prevScores) => {
          const newScores = [...prevScores];
          newScores[activeContestant] += 1;
          return newScores;
        });
      }
    } catch (error) {
      console.error('Error checking answer:', error);
    }
    handleNextContestant();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative text-center p-10 bg-white shadow-lg rounded-lg w-full max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
        >
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Quizmistress</h1>
          <p className="text-lg mb-4">The quizmistress will guide you through the questions.</p>
          <h2 className="text-3xl font-semibold mb-4">Time Left: {timer}s</h2>
        </div>
        <div className="flex justify-center space-x-10 items-center mb-8">
          {[...Array(contestants)].map((_, index) => (
            <div
              key={index}
              className={`relative w-1/3 h-72 p-10 border rounded-lg transition-transform ${
                activeContestant === index ? 'transform scale-105 border-blue-500' : 'border-gray-300'
              }`}
            >
              <h2 className="text-3xl font-semibold">Contestant {index + 1}</h2>
              <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white text-lg py-1">
                Score: {scores[index]}
              </div>
            </div>
          ))}
        </div>
        {currentQuestion && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">{currentQuestion.Question}</h2>
          </div>
        )}
      </div>

      <div className="mt-5 w-full max-w-6xl flex justify-center">
        <img key={gifKey} src={recording_animation} alt="Animation" className="h-24" />
        <AudioRecorder />
      </div>
      <button
        onClick={handleSubmitAnswer}
        className="mt-4 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-700"
      >
        Answer
      </button>
    </div>
  );
};

export default Quiz;
