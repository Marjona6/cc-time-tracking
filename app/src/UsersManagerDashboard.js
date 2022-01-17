import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { API_URL } from "./constants";

const UsersManagerDashboard = (props) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_URL}/users`);
      const result = await response.json();
      setUsers(result);
    })();
  }, []);

  const isLoading = users === null;
  return isLoading ? (
    "Loading…"
  ) : (
    <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li>
            <Link to={`/users/${user.id}`}>{user.id}</Link>
          </li>
        ))}
      </ul>
      <Link to={`/`}>User Dashboard</Link>
    </>
  );
};

export default UsersManagerDashboard;
