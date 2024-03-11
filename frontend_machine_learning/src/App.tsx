import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PersonalInformation from "./Pages/PersonalInformation";
import Habit from "./Pages/Habit";

function App() {
  return (
    <div className="p-2">
      <Router>
        <Routes>
          <Route path="/" element={<PersonalInformation />} />
          <Route path="/habit" element={<Habit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
