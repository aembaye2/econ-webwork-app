from django.db import models


class Student(models.Model):
    username = models.CharField(max_length=20, unique=True)
    score = models.IntegerField(default=0)
    status = models.CharField(max_length=20, default="active")

    class Meta:
        db_table = 'hw01_student'

    def __str__(self):
        return self.username


class Question(models.Model):
    QUESTION_TYPES = [
        ('mc-quest', 'Multiple Choice'),
        ('float-num-quest', 'Float Number'),
        ('one-line-text-quest', 'One Line Text'),
        ('manylines-text-quest', 'Many Lines Text'),
        ('graphing-quest', 'Graphing'),
    ]

    qtype = models.CharField(
        max_length=20, choices=QUESTION_TYPES, default='mc-quest')
    question = models.CharField(max_length=500)
    # To store references as a JSON string or plain text
    references = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'hw01_question'

    def __str__(self):
        return self.question


class QuestionOption(models.Model):
    question = models.ForeignKey(
        Question, related_name='options', on_delete=models.CASCADE)
    option = models.CharField(max_length=300)

    class Meta:
        db_table = 'hw01_questionoption'

    def __str__(self):
        return f"{self.option} for {self.question.question}"


class Ref(models.Model):
    question = models.ForeignKey(
        Question, related_name='refs', on_delete=models.CASCADE)
    ref_type = models.CharField(max_length=50)  # e.g., 'text', 'img'
    # e.g., 'Use the following...', 'actCpi.png'
    ref_value = models.CharField(max_length=300)

    class Meta:
        db_table = 'hw01_ref'

    def __str__(self):
        return f"{self.ref_type}: {self.ref_value} for {self.question.question}"
