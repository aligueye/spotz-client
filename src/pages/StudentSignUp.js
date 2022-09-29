import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const createStudent = async ({ email, password, school }) => {
  const body = { email: email, password: password, school: school };

  return fetch("http://127.0.0.1:5000/student/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {
    return res.status === 200 ? true : false;
  });
};

const StudentSignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password, school }) => {
    const response = await createStudent({ email, password, school });

    if (response) {
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Sign up!</h1>
      <h2>
        Already have an account? <Link to="/login">Log in!</Link>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email:{" "}
          <input type="text" {...register("email", { required: true })} />
          {errors.email?.type === "required" && (
            <span role="alert"> Email is required</span>
          )}
        </label>
        <br />
        <label>
          Password:{" "}
          <input type="text" {...register("password", { required: true })} />
          {errors.password?.type === "required" && (
            <span role="alert"> Password is required</span>
          )}
        </label>
        <br />
        <label>
          School:{" "}
          <input type="text" {...register("school", { required: true })} />
          {errors.school?.type === "required" && (
            <span role="alert"> School is required</span>
          )}
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default StudentSignUp;
