from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.responses import FileResponse
from pydantic import BaseModel
import nest_asyncio
import tempfile
from TTS.tts.configs.vits_config import VitsConfig
from TTS.tts.models.vits import Vits
from TTS.utils.audio.numpy_transforms import save_wav
import numpy as np
import uvicorn

nest_asyncio.apply()

# Paths to your models and config files
student_model_path = 'Text_to_Speech/student/student.onnx'
student_config_path = 'Text_to_Speech/student/studentconfig.json'
quiz_mistress_model_path = 'Text_to_Speech/Quizmistress/quizmistress.onnx'
quiz_mistress_config_path = 'Text_to_Speech/Quizmistress/quizmistressconfig.json'

# Load the configurations
student_config = VitsConfig()
student_config.load_json(student_config_path)

quiz_mistress_config = VitsConfig()
quiz_mistress_config.load_json(quiz_mistress_config_path)

# Initialize the models
student_model = Vits.init_from_config(student_config)
student_model.load_onnx(student_model_path)

quiz_mistress_model = Vits.init_from_config(quiz_mistress_config)
quiz_mistress_model.load_onnx(quiz_mistress_model_path)

# Define TTS function
def tts_call(text: str, model: str):
    # Select model based on input
    if model == "student":
        tts_model = student_model
    elif model == "quiz_mistress":
        tts_model = quiz_mistress_model
    else:
        raise ValueError("Invalid model name")

    # Generate speech
    text_inputs = np.asarray(
        tts_model.tokenizer.text_to_ids(text, language="en"),
        dtype=np.int64,
    )[None, :]
    audio = tts_model.inference_onnx(text_inputs, speaker_id=0)

    # Save to temporary file
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_file:
        out_path = temp_file.name

    save_wav(wav=audio[0], path=out_path, sample_rate=22050)
    return out_path

# FastAPI app setup
tts_app = APIRouter()


# Request model
class TextRequest(BaseModel):
    text: str
    model: str  # 'student' or 'quiz_mistress'

@tts_app.post("/synthesize_audio")
def synthesize_audio(payload: TextRequest):
    try:
        # Call the TTS function
        audio_file_path = tts_call(payload.text, payload.model)
        # Return the audio file
        return FileResponse(audio_file_path, media_type="audio/wav")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@tts_app.get("/")
async def root():
    return {"message": "Hello from the TTS API"}

