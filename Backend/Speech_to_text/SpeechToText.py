import tempfile
from fastapi import FastAPI, File, HTTPException, APIRouter, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import wave
import uvicorn
from .Pipelines import STT_pipelines
import os
import logging

logging.basicConfig(level=logging.DEBUG)


# def get_duration_wave(audio_file_path: str) -> float:
#     try:
#         with wave.open(audio_file_path, 'r') as audio_file:
#             frame_rate = audio_file.getframerate()
#             n_frames = audio_file.getnframes()
#             duration = n_frames / float(frame_rate)
#             return duration
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error processing audio file: {str(e)}")


def transcribe(audio_file_path: str) -> str:
    # duration = get_duration_wave(audio_file_path)
    # if duration >= 30:
    return STT_pipelines.pipe_long(audio_file_path)['text']
    # else:
        # return STT_pipelines.pipe_short(audio_file_path)['text']


stt_app = APIRouter()
class AudioRequest(BaseModel):
    audio_path: str

@stt_app.post("/upload_audio")
async def upload_audio(file: UploadFile = File(...)):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
            temp_file.write(await file.read())
            temp_file_path = temp_file.name
        return {"path": temp_file_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@stt_app.post("/transcribe_audio")
async def transcribe_audio(request: AudioRequest):
    try:
        transcription = transcribe(request.audio_path)
        return {'transcript': transcription}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


