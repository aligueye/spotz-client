import React, { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { encode } from "base-64";
import UserContext from "../utils/UserContext";

const loginLandlord = async ({ email, password }) => {
  return fetch("http://127.0.0.1:5000/landlord-login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + encode(email + ":" + password),
    },
  }).then((data) => data.json());
};

const getUser = async ({ token }) => {
  return fetch("http://127.0.0.1:5000/landlord/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": token,
    },
  }).then((data) => data.json());
};

const LandlordLogin = ({ setToken }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [failed, setFailed] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    const { token } = await loginLandlord({
      email,
      password,
    });

    if (token) {
      const landlord = await getUser({ token });

      landlord.isLandlord = true;

      setUser(landlord);
      setToken(token);

      navigate("/");
    } else {
      setFailed(true);
    }
  };

  return (
    <div>
      <h1>Landlord Login</h1>
      <h2>
        No account? <Link to="/landlord-signup">Sign up!</Link>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {failed && <p role="alert">Incorrect username or password</p>}
        <input
          type="text"
          placeholder="email"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <span role="alert"> Email is required</span>
        )}
        <br />
        <input
          type="text"
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && (
          <span role="alert"> Password is required</span>
        )}
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LandlordLogin;
