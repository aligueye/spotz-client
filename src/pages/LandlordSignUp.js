import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const createLandlord = async ({ email, password }) => {
  const body = { email: email, password: password };

  return fetch("http://127.0.0.1:5000/landlord/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {
    return res.status === 200 ? true : false;
  });
};

const LandlordSignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    const response = await createLandlord({ email, password });

    if (response) {
      navigate("/landlord-login");
    }
  };

  return (
    <div>
      <h1>Landlord Sign up</h1>
      <h2>
        Already have an account? <Link to="/landlord-login">Log in!</Link>
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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default LandlordSignUp;
