import React, { useState } from "react";
import { Link } from "react-router-dom";

const createStudent = async ({ email, password, school }) => {
  const body = { email: email, password: password, school: school };

  return fetch("http://127.0.0.1:5000/student/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((data) => data.json());
};

const StudentSignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [school, setSchool] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await createStudent({ email, password, school });

    console.log(response);
  };

  return (
    <div>
      <h1>Sign up!</h1>
      <h2>
        Already have an account? <Link to="/login">Log in!</Link>
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:{" "}
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:{" "}
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          School:{" "}
          <input type="text" onChange={(e) => setSchool(e.target.value)} />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default StudentSignUp;
