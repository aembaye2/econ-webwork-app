from rest_framework import serializers
from .models import Student, Question, QuestionOption, Ref


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["id", "username", "score", "status"]


class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = ["option"]


class RefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ref
        fields = ["ref_type", "ref_value"]


class QuestionSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField()
    refs = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ["id", "qtype", "question", "options", "refs"]

    def get_options(self, obj):
        return [opt.option for opt in obj.options.all()]

    def get_refs(self, obj):  # Rename this method to match the field name 'refs'
        return [ref.ref_value for ref in obj.refs.all()]
