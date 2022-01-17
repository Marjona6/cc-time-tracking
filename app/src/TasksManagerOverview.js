import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { API_URL } from "./constants";

const TasksManagerOverview = (props) => {
  const { id: userId } = useParams();
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
      <h1>Tasks for User: {userId}</h1>
      <table border="1" width="100%">
        <tr>
          <th>Task</th>
          <th>Total Time (in Seconds)</th>
          <th>Number of Sessions</th>
          <th>Average Session Length</th>
        </tr>
        {tasks.map((task) => (
          <tr>
            <td>{task.instructions}</td>
          </tr>
        ))}
      </table>
      <Link to={"/dashboard"}>Manager Dashboard</Link>
    </>
  );
};

export default TasksManagerOverview;
