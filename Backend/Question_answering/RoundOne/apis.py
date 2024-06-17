from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
import nest_asyncio
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn
from .FundamentalConcepts import QAMLRoundOne

nest_asyncio.apply()

# Initialize the FastAPI app
first_round_app = APIRouter()

round_one = QAMLRoundOne("Question_answering/RoundOne/Round_1.json")

class AnswerCheckRequest(BaseModel):
    user_answer: str
    correct_answer: str


@first_round_app.get("/quiz")
def get_quiz_questions():
    try:
        questions = round_one.get_quiz_questions()
        # Ensure no out-of-range float values are returned
        for question in questions:
            for key, value in question.items():
                if isinstance(value, float) and (value == float('inf') or value == float('-inf')):
                    question[key] = None
        return {"questions": questions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@first_round_app.post("/check-answer")
def check_answer(request: AnswerCheckRequest):
    user_answer = request.user_answer
    correct_answer = request.correct_answer
    
    if round_one.is_correct(user_answer, correct_answer):
        return {"result": "Correct"}
    else:
        return {"result": "Incorrect"}


@first_round_app.get("/")
async def root():
    return {"message": "Hello from the Quiz API"}
