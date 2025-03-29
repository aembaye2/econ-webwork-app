import React from "react";
//import api from "../../api";

const NextButton = ({
  selectedOption,
  setQuestionIndex,
  setSelectedOption,
  numQuestions,
  questionIndex,
  correctOption,
  setStudentScore,
  setLoadingState,
  submitQuizToApi,
}) => {
  if (selectedOption === null) return null;

  function NextQuestion() {
    setQuestionIndex((curr) => curr + 1);
    if (selectedOption === correctOption) {
      setStudentScore((curr) => curr + 5);
    }
    setSelectedOption(null);
  }

  function submitQuiz() {
    setLoadingState("finished");
    if (selectedOption === correctOption) {
      setStudentScore((curr) => {
        const updatedScore = curr + 5;
        submitQuizToApi(updatedScore);

        return updatedScore;
      });
    }
  }

  if (questionIndex === numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={submitQuiz}>
        Submit Quiz
      </button>
    );

  return (
    <button className="btn btn-ui" onClick={NextQuestion}>
      Next
    </button>
  );
};

export default NextButton;
