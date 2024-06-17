import React, { useState, useRef } from 'react';
import axios from 'axios';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [transcription, setTranscription] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          console.log('Data available: ', event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        console.log('Audio Blob: ', audioBlob);
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioURL(audioURL);
        uploadAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error('Error starting recording: ', error);
    }
  };

  const stopRecording = () => {
    try {
      setIsRecording(false);
      mediaRecorderRef.current.stop();
    } catch (error) {
      console.error('Error stopping recording: ', error);
    }
  };

  const uploadAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');

    try {
      const response = await axios.post('http://localhost:8000/api/stt/upload_audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const audioPath = response.data.path;
      transcribeAudio(audioPath);
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  const transcribeAudio = async (audioPath) => {
    try {
      const response = await axios.post('http://localhost:8000/api/stt/transcribe_audio', { path: audioPath }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTranscription(response.data.transcript);
    } catch (error) {
      console.error('Error transcribing audio:', error);
    }
  };

  return (
    <div>
      <h1>Audio Recorder</h1>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioURL && (
        <div>
          <h2>Recorded Audio</h2>
          <audio src={audioURL} controls />
        </div>
      )}
      {transcription && (
        <div>
          <h2>Transcription</h2>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
