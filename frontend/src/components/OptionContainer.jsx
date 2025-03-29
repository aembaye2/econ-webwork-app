import React from "react";

const OptionContainer = ({
  question,
  setCorrectOption,
  selectedOption,
  setSelectedOption,
}) => {
  const options = question.options;
  //const options = question.quizapp2_options;

  function selectAnswer(index, option) {
    setSelectedOption(index);

    if (option.is_correct === true) {
      setCorrectOption(index);
    }
  }

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          key={option.id}
          className={`btn btn-option ${
            selectedOption === index ? "answer correct" : ""
          } `}
          onClick={() => selectAnswer(index, option)}
        >
          {option.option}
        </button>
      ))}
    </div>
  );
};

export default OptionContainer;
