import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import TasksUserOverview from "./TasksUserOverview";
import TaskSubmit from "./TaskSubmit";
import UsersManagerDashboard from "./UsersManagerDashboard";
import TasksManagerOverview from "./TasksManagerOverview";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TasksUserOverview />} />
        <Route path="/:id" element={<TaskSubmit />} />
        <Route path="/dashboard" element={<UsersManagerDashboard />} />
        <Route path="/users/:id" element={<TasksManagerOverview />} />
      </Routes>
    </div>
  );
}

export default App;
