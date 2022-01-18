import React, { useState, useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { API_URL } from "./constants";

const TaskSubmit = ({ userId = "0001", ...props }) => {
  const { id: taskId } = useParams();
  const [task, setTask] = useState(null);
  const [errors, setErrors] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_URL}/tasks/${taskId}`);
      const result = await response.json();
      setTask(result);
      if (result.answer) setAnswer(result.answer);
    })();
  }, [taskId]);

  const onBeginSession = useCallback(
    (event) => {
      (async () => {
        let currentTask;
        if (task === null) {
          const response1 = await fetch(`${API_URL}/tasks/${taskId}`);
          currentTask = await response1.json();
        } else currentTask = task;
        if (!currentTask.submitted) {
          const updatedSessions = currentTask.sessions || {};
          updatedSessions[userId] = updatedSessions[userId] || [];
          updatedSessions[userId] = [...updatedSessions[userId], { begin: new Date().getTime() }];

          const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...currentTask, sessions: updatedSessions }),
          });
          const result = await response.json();

          if (result) {
            setTask(result);
          } else {
            setErrors(JSON.stringify(result)); // TODO
          }
        }
      })();
    },
    [taskId, userId, task]
  );

  const onEndSession = useCallback(
    (event) => {
      (async () => {
        let currentTask;
        if (task === null) {
          const response1 = await fetch(`${API_URL}/tasks/${taskId}`);
          currentTask = await response1.json();
        } else currentTask = task;
        if (!currentTask.submitted) {
          const updatedSessions = currentTask.sessions || {};
          updatedSessions[userId] = updatedSessions[userId] || [];
          updatedSessions[userId][updatedSessions[userId].length - 1] = { ...updatedSessions[userId][updatedSessions[userId].length - 1], end: new Date().getTime() };

          const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...currentTask, sessions: updatedSessions }),
          });
          const result = await response.json();

          if (result) {
            setTask(result);
          } else {
            setErrors(JSON.stringify(result)); // TODO
          }
        }
      })();
    },
    [taskId, userId, task]
  );

  const onChangeAnswer = useCallback((event) => setAnswer(event.target.value), []);

  const onSubmitAnswer = useCallback(
    (event) => {
      (async () => {
        setIsSubmitting(true);

        const updatedSessions = task.sessions || {};
        updatedSessions[userId] = updatedSessions[userId] || [];
        updatedSessions[userId][updatedSessions[userId].length - 1] = { ...updatedSessions[userId][updatedSessions[userId].length - 1], end: new Date().getTime() };

        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...task, submitted: true, answer, sessions: updatedSessions }),
        });
        const result = await response.json();

        if (result) {
          setTask(result);
        } else {
          setErrors(JSON.stringify(result)); // TODO
        }

        setIsSubmitting(false);
      })();
    },
    [taskId, answer, task, userId]
  );

  const onSaveAnswer = useCallback(
    (event) => {
      (async () => {
        setIsSaving(true);

        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...task, submitted: false, answer }), // TODO end current session? if user is still focusing this window, I'll assume the user is still working on the task until either navigating away or clicking submit
        });
        const result = await response.json();

        if (result) {
          setTask(result);
        } else {
          setErrors(JSON.stringify(result)); // TODO
        }

        setIsSaving(false);
      })();
    },
    [taskId, answer, task]
  );

  const onWindowFocus = () => {
    onBeginSession();
  };

  const onWindowBlur = () => {
    onEndSession();
  };

  useEffect(() => {
    onWindowFocus();

    window.addEventListener("focus", onWindowFocus);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      onWindowBlur();

      window.removeEventListener("focus", onWindowFocus);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, []);

  const isLoading = task === null;

  return isLoading ? (
    "Loading…"
  ) : (
    <>
      <div>
        <Link to="/">Back</Link>
      </div>
      <div>
        <h1>{task.instructions}</h1>

        {task.submitted ? (
          <>
            <h3>Your answer</h3>
            <hr />
            <p>{task.answer}</p>
          </>
        ) : (
          <>
            <p>Submit your answer:</p>
            <textarea rows="20" style={{ display: "block", width: "80%" }} onChange={onChangeAnswer} value={answer} />
            {errors ? <p>{errors}</p> : null}
            <button onClick={onSubmitAnswer} disabled={isSubmitting}>
              Submit
            </button>
            <button onClick={onSaveAnswer} disabled={isSubmitting || isSaving}>
              Save without submitting
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default TaskSubmit;
