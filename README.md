# AI-Powered NSMQ Quiz Application

## Description
The AI-Powered NSMQ Quiz Application is designed to help high school students prepare for the National Science and Maths Quiz (NSMQ). Utilizing advanced technologies such as Natural Language Processing (NLP), Speech-to-Text (STT), and Text-to-Speech (TTS), this application provides an immersive and interactive learning experience. The system features adaptive learning paths, personalized feedback, and realistic quiz simulations to enhance students' preparation for the competition.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Realistic Quiz Simulations**: Timed quizzes that mimic the NSMQ competition environment.
- **Adaptive Learning Paths**: Personalized feedback and adaptive question paths based on performance.
- **Speech Interaction**: Integration of speech-to-text and text-to-speech for interactive learning.
- **Practice and Tournament Modes**: Separate modes for practice and competitive preparation.
- **Audio Recording and Transcription**: Allows users to answer questions through audio inputs, enhancing the realistic feel of a quiz competition.

## Technologies Used
- **Frontend**:
  - React: For building the user interface.
  - Tailwind CSS: For styling.
  - Vite: As a build tool.
  - Tauri: For wrapping the application into a desktop application.
- **Backend**:
  - FastAPI: To handle backend services.
  - Python: Programming language used.
- **Machine Learning**:
  - NLP: For processing and understanding human language.
  - STT: For converting spoken language into text.
  - TTS: For converting text into spoken audio.



## Installation

### Prerequisites
- Node.js and npm
- Python 3 and pip
- Virtual environment (optional but recommended)

### Frontend Installation
```bash
cd frontend
npm install
npm run dev
```

### Backend Installation
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
uvicorn main:app --reload
```
