from django.core.management.base import BaseCommand
from hw01.models import Question, QuestionOption, Ref


class Command(BaseCommand):
    help = "Resets the questions, options, and references in the database and adds new ones"

    def handle(self, *args, **kwargs):
        # Delete all existing questions, options, and references
        Ref.objects.all().delete()
        QuestionOption.objects.all().delete()
        Question.objects.all().delete()

        # Define new questions and options
        quiz_data = {
            "questions": [
                {
                    "qtype": "mc-quest",
                    "question": "What is the capital of France?",
                    "options": ["A. London", "B. Paris", "C. Amsterdam", "D. Berlin"],
                    "Ref": "",
                },
                {
                    "qtype": "one-line-text-quest",
                    "question": "Compute the CPI for the three years and values, separating them by commas or semicolons.",
                    "Ref": [
                        "img",
                        "actCpi.png",
                        "Use the following table to answer the question.",
                        "Reference 1: Pollution Reduction",
                    ],
                },
                {
                    "qtype": "graphing-quest",
                    "question": "Draw initial demand and supply curves. Mark the equilibrium as A. Show the effect of a fall in the price of CDs by shifting the appropriate curve(s).",
                    "options": ["line", "point", "curve"],
                    "Ref": [],
                },
                {
                    "qtype": "float-num-quest",
                    "question": "If x=5, what is the value of 2x+3?",
                    "options": [],
                    "Ref": "",
                },
                {
                    "qtype": "one-line-text-quest",
                    "question": "As per your graphing, what are the equilibrium price and quantity?",
                    "Ref": "",
                },
            ]
        }

        # Insert new questions, options, and references
        for item in quiz_data["questions"]:
            question = Question.objects.create(
                qtype=item["qtype"],
                question=item["question"],
                references="; ".join(item["Ref"]) if isinstance(
                    item["Ref"], list) else item["Ref"]
            )

            # Add options
            for opt in item.get("options", []):
                QuestionOption.objects.create(question=question, option=opt)

            # Add references without prefix
            if isinstance(item["Ref"], list):
                for ref_value in item["Ref"]:
                    Ref.objects.create(
                        question=question, ref_type="", ref_value=ref_value)

        self.stdout.write(self.style.SUCCESS(
            "Successfully added quiz questions, options, and references!"))
