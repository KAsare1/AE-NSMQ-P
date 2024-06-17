from fastapi import FastAPI, APIRouter
from pydantic import BaseModel
from .TrueOrFalse import QAMLRoundFour

fourth_round_app = APIRouter()
round_four = QAMLRoundFour('Question_answering/RoundFour/Round_4.json')

class AnswerCheckRequest(BaseModel):
    user_answer: str
    correct_answer: str

@fourth_round_app.get("/quiz")
def get_quiz_questions():
    questions = round_four.get_quiz_questions()
    return questions


@fourth_round_app.post("/check-answer")
def check_answer(request: AnswerCheckRequest):
    user_answer = request.user_answer
    correct_answer = request.correct_answer
    
    if round_four.is_correct(user_answer, correct_answer):
        return {"result": "Correct"}
    else:
        return {"result": "Incorrect"}

