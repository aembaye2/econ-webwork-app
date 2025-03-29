from django.core.management.base import BaseCommand
from quizapp2.models import Question, QuestionOption


class Command(BaseCommand):
    help = "Adds sample questions and options to the database"

    def handle(self, *args, **kwargs):
        # Define questions and options
        data = [
            {
                "question": "What is 2 + 2?",
                "options": [
                    {"option": "3", "is_correct": False},
                    {"option": "4", "is_correct": True},
                    {"option": "5", "is_correct": False},
                    {"option": "6", "is_correct": False},
                ]
            },
            {
                "question": "Which planet is known as the Red Planet?",
                "options": [
                    {"option": "Earth", "is_correct": False},
                    {"option": "Mars", "is_correct": True},
                    {"option": "Jupiter", "is_correct": False},
                    {"option": "Venus", "is_correct": False},
                ]
            },
            {
                "question": "What is the capital of France?",
                "options": [
                    {"option": "Berlin", "is_correct": False},
                    {"option": "Madrid", "is_correct": False},
                    {"option": "Paris", "is_correct": True},
                    {"option": "Rome", "is_correct": False},
                ]
            },
            {
                "question": "What is the largest ocean on Earth?",
                "options": [
                    {"option": "Atlantic Ocean", "is_correct": False},
                    {"option": "Indian Ocean", "is_correct": False},
                    {"option": "Arctic Ocean", "is_correct": False},
                    {"option": "Pacific Ocean", "is_correct": True},
                ]
            },
            {
                "question": "Who wrote 'To Kill a Mockingbird'?",
                "options": [
                    {"option": "Harper Lee", "is_correct": True},
                    {"option": "Mark Twain", "is_correct": False},
                    {"option": "Ernest Hemingway", "is_correct": False},
                    {"option": "F. Scott Fitzgerald", "is_correct": False},
                ]
            }
        ]

        # Insert into the database
        for item in data:
            question, created = Question.objects.get_or_create(
                question=item["question"])
            if created:
                for opt in item["options"]:
                    QuestionOption.objects.create(
                        question=question, option=opt["option"], is_correct=opt["is_correct"]
                    )

        self.stdout.write(self.style.SUCCESS(
            "Successfully added questions and options!"
        ))
