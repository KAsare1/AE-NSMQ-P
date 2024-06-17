from fastapi import FastAPI, APIRouter
from pydantic import BaseModel
import nest_asyncio
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn
from .SpeedRace import QAMLRoundTwo

nest_asyncio.apply()

# Initialize the FastAPI app
second_round_app = APIRouter()




round_one = QAMLRoundTwo("Question_answering/RoundTwo/Round_2.json")

class AnswerCheckRequest(BaseModel):
    user_answer: str
    correct_answer: str


@second_round_app.get("/quiz")
def get_quiz_questions():
    questions = round_one.get_quiz_questions()
    return questions


@second_round_app.post("/check-answer")
def check_answer(request: AnswerCheckRequest):
    user_answer = request.user_answer
    correct_answer = request.correct_answer
    
    if round_one.is_correct(user_answer, correct_answer):
        return {"result": "Correct"}
    else:
        return {"result": "Incorrect"}


@second_round_app.get("/")
async def root():
    return {"message": "Hello from the Quiz API"}
