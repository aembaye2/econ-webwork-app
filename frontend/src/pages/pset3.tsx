import QuestionsComponent from "../comp2/QuestionsComponent";
import React, { useEffect, useState } from "react";
import api from "../../api";

interface Pset3Props {
  appName: string;
  //api: any; // Pass the API instance as a prop
}

interface Question {
  id: number;
  qtype: string;
  question: string;
  options: string[];
  refs: string[];
}

interface StudentQuiz {
  username: string | null;
  score: number;
}

const quizName = "Pset3"; // Name of the quiz

const Pset3 = ({ appName }: Pset3Props) => {
  const [loadingState, setLoadingState] = useState("loading");
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [studentScore, setStudentScore] = useState(0);
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username") || ""
  );

  // Function to fetch questions from the API
  function getQuestion() {
    api
      .get(`${appName}questions/`)
      .then((res) => {
        setQuestions(res.data);
        setLoadingState("ready");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  }

  // Function to submit quiz score to the API
  function submitQuizToApi(updatedScore: number) {
    const studentQuiz: StudentQuiz = {
      username: localStorage.getItem("username"),
      score: updatedScore,
    };
    api
      .post(`${appName}submit_quiz/`, studentQuiz)
      .then((res) => console.log("Quiz submitted:", res.data))
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    getQuestion();
  }, []);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSaveUsername = () => {
    if (username) {
      localStorage.setItem("username", username);
    }
  };

  return (
    <div>
      <h4>You are in Pset3.tsx file</h4>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username || ""}
            onChange={handleUsernameChange}
          />
        </label>
        <button onClick={handleSaveUsername}>Save Username</button>
      </div>
      {loadingState === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {loadingState === "ready" && (
        <QuestionsComponent questions={questions} quizName={quizName} />
      )}
    </div>
  );
};

export default Pset3;
