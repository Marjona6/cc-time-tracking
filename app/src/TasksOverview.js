import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { API_URL } from "./constants";

const TasksOverview = (props) => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_URL}/tasks`);
      const result = await response.json();
      setTasks(result);
    })();
  }, []);

  const isLoading = tasks === null;
  return isLoading ? (
    "Loading…"
  ) : (
    <>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li>
            <Link to={`/${task.id}`}>{task.instructions}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TasksOverview;
