from django.urls import path
# from . import views
from .views import questions, has_taken_quiz, submit_quiz

urlpatterns = [
    path("questions/", questions, name="quizapp2_questions"),  # GET all questions
    # POST check if user has taken quiz
    path("has_taken_quiz/", has_taken_quiz, name="quizapp2_has_taken_quiz"),
    # POST submit quiz score
    path("submit_quiz/", submit_quiz, name="quizapp2_submit_quiz"),
]
