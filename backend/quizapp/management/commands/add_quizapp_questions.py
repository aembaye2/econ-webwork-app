from django.core.management.base import BaseCommand
from quizapp.models import Question, QuestionOption


class Command(BaseCommand):
    help = "Resets the questions and options in the database and adds new ones"

    def handle(self, *args, **kwargs):
        # Delete all existing questions and options
        QuestionOption.objects.all().delete()
        Question.objects.all().delete()

        # Define new questions and options
        quiz_data = [
            {
                "question": "What is the capital of France?",
                "options": [
                    {"option": "A. London", "is_correct": False},
                    {"option": "B. Paris", "is_correct": True},
                    {"option": "C. Amsterdam", "is_correct": False},
                    {"option": "D. Berlin", "is_correct": False},
                ],
            },
            {
                "question": "Which programming language is used for web development?",
                "options": [
                    {"option": "A. Python", "is_correct": True},
                    {"option": "B. Java", "is_correct": False},
                    {"option": "C. C++", "is_correct": False},
                    {"option": "D. Assembly", "is_correct": False},
                ],
            },
            {
                "question": "What is the largest planet in our solar system?",
                "options": [
                    {"option": "A. Earth", "is_correct": False},
                    {"option": "B. Mars", "is_correct": False},
                    {"option": "C. Jupiter", "is_correct": True},
                    {"option": "D. Venus", "is_correct": False},
                ],
            },
            {
                "question": "What is the boiling point of water at sea level?",
                "options": [
                    {"option": "A. 90°C", "is_correct": False},
                    {"option": "B. 100°C", "is_correct": True},
                    {"option": "C. 110°C", "is_correct": False},
                    {"option": "D. 120°C", "is_correct": False},
                ],
            },
            {
                "question": "Who wrote the play 'Romeo and Juliet'?",
                "options": [
                    {"option": "A. Charles Dickens", "is_correct": False},
                    {"option": "B. William Shakespeare", "is_correct": True},
                    {"option": "C. Mark Twain", "is_correct": False},
                    {"option": "D. Jane Austen", "is_correct": False},
                ],
            },
        ]

        # Insert new questions and options
        for item in quiz_data:
            question = Question.objects.create(question=item["question"])
            for opt in item["options"]:
                QuestionOption.objects.create(
                    question=question, option=opt["option"], is_correct=opt["is_correct"]
                )

        self.stdout.write(self.style.SUCCESS(
            "Successfully added quiz questions and options!"))
