// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter as Router
import "./App.css";
import Navbar from "./Navbar";
import Home from "./pages";
import QuestionsCompMC from "./comp2/QuestionsCompMC";
import QuestionsCompHW from "./comp2/QuestionsCompHW";
import CanvasComp from "./comp2/CanvasComp";
import Pset3 from "./pages/pset3";
// import Footer from "./components/Footer"; // Uncomment if Footer is defined

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route
              path="/questions-mc"
              element={<QuestionsCompMC appName="quizapp2/" />}
            />
            <Route path="/canvas" element={<CanvasComp />} />
            <Route
              path="/questions-hw"
              element={<QuestionsCompHW appName="quizapp2/" />}
            />
            <Route path="/pset3" element={<Pset3 appName="hw01/"/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
