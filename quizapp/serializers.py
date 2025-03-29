from rest_framework import serializers
from .models import Student, Question, QuestionOption


class Student(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["id", "username", "score", "status"]


class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = ["id", "option", "is_correct"]


# notice the nested serializer;
class QuestionSerializer(serializers.ModelSerializer):
    # QuestionOptionSerializer is nested inside QuestionSerializer, comes from the above class definition; so this combines question text with options
    options = QuestionOptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'question', 'options']
