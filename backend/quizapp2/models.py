from django.db import models


class Student(models.Model):
    username = models.CharField(max_length=20, unique=True)
    score = models.IntegerField(default=0)
    status = models.CharField(max_length=20, default="active")

    class Meta:
        # db_table = 'quizapp2_student'  # Unique table name
        db_table = 'student'

    def __str__(self):
        return self.username


class Question(models.Model):
    question = models.CharField(max_length=500, unique=True)

    class Meta:
        # db_table = 'quizapp2_question'  # Unique table name
        db_table = 'question'

    def __str__(self):
        return self.question


class QuestionOption(models.Model):
    question = models.ForeignKey(
        # Question, related_name='quizapp2_options', on_delete=models.CASCADE)
        Question, related_name='options', on_delete=models.CASCADE)
    option = models.CharField(max_length=300)
    is_correct = models.BooleanField(default=False)

    class Meta:
        # db_table = 'quizapp2_questionoption'  # Unique table name
        db_table = 'questionoption'  # Unique table name

    def __str__(self):
        return f"{self.option} for {self.question.question}"
