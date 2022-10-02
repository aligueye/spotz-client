import React, { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import UserContext from "../utils/UserContext";

const putUser = async ({ password, school, user }) => {
  const token = localStorage.getItem("token");
  const body = { ...user };
  if (password) {
    body.password = password;
  }
  if (school) {
    body.school = school;
  }
  return fetch("http://127.0.0.1:5000/student/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": token,
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return false;
    }
  });
};

const StudentProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [failed, setFailed] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ password, school }) => {
    const response = await putUser({ password, school, user });
    if (response) {
      setUser(response);
    } else {
      setFailed(true);
    }
  };

  return (
    <div>
      <h1>Renter Profile</h1>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <p>School: {user.school}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Password{" "}
          <input
            type="text"
            placeholder={user?.password}
            {...register("password")}
          ></input>
        </label>
        <br />
        <label>
          School{" "}
          <input
            type="text"
            placeholder={user?.school}
            {...register("school")}
          ></input>
        </label>
        <br />
        {failed === true && <h4>Something went wrong</h4>}
        {/* Add way to assign house to student */}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default StudentProfile;
