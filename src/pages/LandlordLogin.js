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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Landlord Login</h1>
        <h2 className="mb-6">
          No account?{" "}
          <Link
            to="/landlord-signup"
            className="text-blue-600 hover:text-blue-800"
          >
            Sign up!
          </Link>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {failed && (
            <p role="alert" className="text-red-600">
              Incorrect username or password
            </p>
          )}
          <input
            type="text"
            placeholder="email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {errors.email?.type === "required" && (
            <span role="alert" className="text-red-600">
              Email is required
            </span>
          )}
          <input
            type="text"
            placeholder="password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {errors.password?.type === "required" && (
            <span role="alert" className="text-red-600">
              Password is required
            </span>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LandlordLogin;
