import { useEffect, useState } from "react";
import Error from "../components/Error";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Main from "../components/Main";
import api from "../../api";
import Question from "../components/Question";
import NextButton from "../components/NextButton";
import FinishedScreen from "../components/FinishedScreen";
import Progress from "../components/Progress";
import Timer from "../components/Timer";
import Footer from "../components/Footer";
import StartScreen from "./StartScreen";

const QuestionsCompMC = ({ appName }) => {
  const [loadingState, setLoadingState] = useState("loading");
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]); //AE: this is the state that holds the questions
  console.log(`questons in the QuestionsCompHW.jsx`, questions);

  const [username, setUsername] = useState("Embaye");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [studentScore, setStudentScore] = useState(0); //AE: this is the state that holds the score
  const [timeRemaining, setTimeRemaining] = useState(null);
  const scorePerQuestion = 5;
  const secondsPerQuestion = 10;
  const numQuestions = questions.length;
  const quizTotalScore = numQuestions * scorePerQuestion;
  //const appName = "quizapp2/";
  //const appName = "";

  //AE: this is the function that gets the questions from the API and sets the state of the questions
  function getQuestion() {
    api
      //.get("questions/") //AE: note the get request to the API
      .get(`${appName}questions`)
      .then((res) => {
        setQuestions(res.data);
      })

      .catch((err) => {
        console.log(err.message);
      });
  }

  function reloadPage() {
    setLoadingState("finished");
    getQuestion();
    submitQuizToApi(studentScore); //AE: this is the function that submits the squore to the API
  }

  //AE: this is the function that submits the quiz to the API, the logic is here
  function submitQuizToApi(updatedScore) {
    const studentQuiz = {
      username: localStorage.getItem("username"),
      score: updatedScore,
    };
    api
      .post(`${appName}submit_quiz/`, studentQuiz)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  }

  useEffect(function () {
    if (localStorage.getItem("username")) {
      return reloadPage();
    }
    api
      //.get("questions/")
      .get(`${appName}questions/`)
      .then((res) => {
        //console.log(res.data);
        setQuestions(res.data);
        setLoadingState("ready");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  }, []);

  // warning not to reload the page or refresh the browser
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Required for some browsers to display the warning
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // AE: this is the displayed part of the App component
  return (
    <div className="app">
      <h4>You are using "QuestionCompHW.jsx" file</h4>
      <Header />
      {/* <h4>Score: {studentScore}</h4> */}
      <Main>
        {loadingState === "loading" && <Loader />}
        {error && <Error error={error} />}
        {loadingState === "ready" && (
          <StartScreen
            username={username}
            setUsername={setUsername}
            numQuestions={numQuestions}
            setLoadingState={setLoadingState}
            setTimeRemaining={setTimeRemaining}
            secondsPerQuestion={secondsPerQuestion}
            appName={appName}
          />
        )}

        {loadingState === "active" && (
          <>
            <Progress
              questionIndex={questionIndex}
              username={username}
              numQuestions={numQuestions}
            />
            <Question
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              question={questions[questionIndex]}
              setCorrectOption={setCorrectOption}
            />

            <Footer>
              <Timer
                timeRemaining={timeRemaining}
                setTimeRemaining={setTimeRemaining}
                setLoadingState={setLoadingState}
                submitQuizToApi={submitQuizToApi}
                studentScore={studentScore}
              />
              <NextButton
                selectedOption={selectedOption}
                setQuestionIndex={setQuestionIndex}
                setSelectedOption={setSelectedOption}
                numQuestions={numQuestions}
                questionIndex={questionIndex}
                correctOption={correctOption}
                setStudentScore={setStudentScore}
                setLoadingState={setLoadingState}
                submitQuizToApi={submitQuizToApi}
              />
            </Footer>
          </>
        )}
        {loadingState === "finished" && (
          <FinishedScreen
            quizTotalScore={quizTotalScore}
            studentScore={studentScore}
            setLoadingState={setLoadingState}
            setQuestionIndex={setQuestionIndex}
            setSelectedOption={setSelectedOption}
            setCorrectOption={setCorrectOption}
            setStudentScore={setStudentScore}
            setUsername={setUsername}
          />
        )}
      </Main>
    </div>
  );
};

export default QuestionsCompMC;
