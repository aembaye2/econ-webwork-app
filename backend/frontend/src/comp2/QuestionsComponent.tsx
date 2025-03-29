import React, { useState, useEffect } from "react";
import { handleGeneratePDF } from "./utils";
import { DrawingApp, modes } from "ae-drawable-canvas";

interface QuizProps {
  questions: {
    id: number;
    qtype: string;
    question: string;
    options?: string[];
    refs: string | string[];
  }[];
  quizName: string;
}

const QuestionsComponent = ({ questions, quizName }: QuizProps) => {
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: string | number;
  }>({});
  const [fullname, setFullname] = useState("");
  const [questionIndex, setquestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [nextButtonClicked, setNextButtonClicked] = useState(false);
  const [filteredModes, setFilteredModes] = useState(modes);

  useEffect(() => {
    const storedAnswers = localStorage.getItem("userAnswers");
    if (storedAnswers) {
      setUserAnswers(JSON.parse(storedAnswers));
    }

    questions.forEach((question, index) => {
      if (question.qtype === "graphing-quest") {
        const drawingKey = `${quizName}-canvasDrawing-${index}`;
        if (!localStorage.getItem(drawingKey)) {
          const initialDrawing = { objects: [], background: "" };
          localStorage.setItem(drawingKey, JSON.stringify(initialDrawing));
        }
      }
    });
  }, [questions, quizName]);

  const saveCanvasImage2storage = async (index: number) => {
    const mainCanvasId = `canvas-${index}`;
    const backgroundCanvasId = `backgroundimage-canvas-${index}`;

    const mainCanvas = document.getElementById(
      mainCanvasId
    ) as HTMLCanvasElement;
    const backgroundCanvas = document.getElementById(
      backgroundCanvasId
    ) as HTMLCanvasElement;

    if (!mainCanvas || !backgroundCanvas) {
      console.error("Canvas elements not found");
      return null;
    }

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = mainCanvas.width;
    tempCanvas.height = mainCanvas.height;
    const tempCtx = tempCanvas.getContext("2d");

    if (!tempCtx) {
      console.error("Failed to get 2D context");
      return null;
    }

    tempCtx.drawImage(
      backgroundCanvas,
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    );
    tempCtx.drawImage(mainCanvas, 0, 0, tempCanvas.width, tempCanvas.height);

    const dataURL = tempCanvas.toDataURL("image/png");
    localStorage.setItem(`${quizName}-canvasImage-${index}`, dataURL);
  };

  const handleInputChange = (questionId: any, value: any) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  useEffect(() => {
    if (questions[questionIndex].qtype === "graphing-quest") {
      var x: string[] = questions[questionIndex].options || [];
      setFilteredModes(
        modes.filter((modeObj: any) => x.includes(modeObj.mode))
      );
    }
  }, [questionIndex]);

  const handleNext = async () => {
    setNextButtonClicked(true);
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

    if (questions[questionIndex].qtype === "graphing-quest") {
      await saveCanvasImage2storage(questionIndex);
    }

    if (questionIndex === questions.length - 2) {
      alert(
        "Please don't forget to download the PDF and submit it to gradescope after you do the last question. Finishing the assessment may save your work temporarly to your browser but it doesn't submit it to the server where the instructor has access."
      );
    }
    if (questionIndex !== questions.length - 1) {
      setquestionIndex(questionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (questionIndex > 0) {
      setquestionIndex(questionIndex - 1);
    }
  };

  return (
    <div className="min-h-[100px]">
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">
        <form>
          {!showResults ? (
            <>
              {/* <div style={{ marginBottom: "30px" }}>
                <label>
                  Full Name:
                  <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    style={{
                      marginLeft: "10px",
                      width: "400px",
                      height: "40px",
                    }}
                  />
                </label>
              </div> */}
              <div
                style={{
                  textAlign: "right",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3 style={{ margin: 0 }}>
                  Question: {questionIndex + 1}
                  <span>/{questions.length}</span>
                </h3>
                <button
                  type="button"
                  onClick={(e) =>
                    handleGeneratePDF(
                      e,
                      questions,
                      userAnswers,
                      fullname,
                      quizName
                    )
                  }
                >
                  {questionIndex === questions.length - 1
                    ? "Download PDF File"
                    : "Download PDF File"}
                </button>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ marginBottom: "20px" }}>
                  {questions &&
                    questions.length > 0 &&
                    questionIndex >= 0 &&
                    questions[questionIndex].refs.length > 0 && (
                      <>
                        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                          {`${questions[questionIndex].refs[3]}`}
                        </div>
                        {questions[questionIndex].refs[0] === "img" && (
                          <img
                            //src={`/${questions[questionIndex].refs[1]}`}
                            src={
                              new URL(
                                `../assets/${questions[questionIndex].refs[1]}`,
                                import.meta.url
                              ).href
                            }
                            alt="Question Reference"
                            style={{ maxWidth: "75%", marginTop: "10px" }}
                          />
                        )}
                        {questions[questionIndex].refs[0] === "url_link" && (
                          <>
                            <div>
                              {questions[questionIndex].refs[2] && (
                                <span>
                                  {questions[questionIndex].refs[2]}&nbsp;
                                </span>
                              )}
                              <a
                                href={questions[questionIndex].refs[1]}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {questions[questionIndex].refs[1]}
                              </a>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  <br />
                  {questionIndex < questions.length && (
                    <div style={{ marginTop: "20px" }}>
                      <label
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        {questionIndex + 1}. {questions[questionIndex].question}
                      </label>
                    </div>
                  )}
                </div>

                {questions[questionIndex].qtype === "mc-quest" && (
                  <div>
                    {questions[questionIndex].options?.map((option, i) => (
                      <div key={i}>
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          value={option}
                          checked={userAnswers[questionIndex] === option}
                          onChange={() =>
                            handleInputChange(questionIndex, option)
                          }
                        />
                        {option}
                      </div>
                    ))}
                  </div>
                )}
                {questions[questionIndex].qtype === "float-num-quest" && (
                  <div style={{ marginTop: "10px" }}>
                    <input
                      type="number"
                      value={userAnswers[questionIndex] || ""}
                      style={{ height: "35px", fontSize: "16px" }}
                      onChange={(e) =>
                        handleInputChange(questionIndex, e.target.value)
                      }
                    />
                  </div>
                )}
                {questions[questionIndex].qtype === "one-line-text-quest" && (
                  <div style={{ marginTop: "10px" }}>
                    <input
                      type="text"
                      value={userAnswers[questionIndex] || ""}
                      maxLength={150}
                      style={{
                        width: "90%",
                        height: "35px",
                        fontSize: "20px",
                      }}
                      onChange={(e) =>
                        handleInputChange(questionIndex, e.target.value)
                      }
                    />
                  </div>
                )}
                {questions[questionIndex].qtype === "manylines-text-quest" && (
                  <div style={{ marginTop: "10px" }}>
                    <textarea
                      value={userAnswers[questionIndex] || ""}
                      maxLength={1000}
                      style={{
                        width: "96%",
                        height: "200px",
                        fontSize: "20px",
                      }}
                      onChange={(e) =>
                        handleInputChange(questionIndex, e.target.value)
                      }
                    />
                  </div>
                )}
                {questions[questionIndex].qtype === "graphing-quest" && (
                  <div
                    style={{
                      marginTop: "50px",
                      marginLeft: "50px",
                      marginBottom: "500px",
                    }}
                  >
                    <DrawingApp
                      index={questionIndex}
                      AssessName={quizName || ""}
                      canvasWidth={500}
                      canvasHeight={350}
                      nextButtonClicked={nextButtonClicked}
                      modes={filteredModes}
                    />
                  </div>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={questionIndex === 0}
                >
                  {questionIndex === 0 ? "" : "← Previous Question"}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  style={{ marginRight: "200px" }}
                >
                  {questionIndex === questions.length - 1
                    ? "Finish Assessment"
                    : "Next Question →"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div style={{ marginTop: "20px" }}>
                <h3> You have successfully completed {quizName} ...! 📈</h3>
              </div>
              <div style={{ marginTop: "20px" }}>
                <button onClick={() => window.location.reload()}>
                  Restart Assessement →
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default QuestionsComponent;
