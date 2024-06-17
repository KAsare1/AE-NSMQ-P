from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Speech_to_text.SpeechToText import stt_app
from Text_to_Speech.TextToSpeech import tts_app
from Question_answering.RoundOne.apis import first_round_app
from Question_answering.RoundTwo.apis import second_round_app
from Question_answering.RoundFour.apis import fourth_round_app

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(stt_app, prefix="/api/stt")
app.include_router(tts_app, prefix="/api/tts")
app.include_router(first_round_app, prefix="/api/round1")
app.include_router(second_round_app, prefix="/api/round2")
app.include_router(fourth_round_app, prefix="/api/round4")

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
