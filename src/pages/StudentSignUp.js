import React from "react";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Renter Sign up!</h1>
        <h2 className="mb-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Log in!
          </Link>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold">Email:</label>
            <input
              type="text"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.email?.type === "required" && (
              <span role="alert" className="text-red-600">
                Email is required
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span role="alert" className="text-red-600">
                Invalid email format
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Password:</label>
            <input
              type="text"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.password?.type === "required" && (
              <span role="alert" className="text-red-600">
                Password is required
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">School:</label>
            <input
              type="text"
              {...register("school", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.school?.type === "required" && (
              <span role="alert" className="text-red-600">
                School is required
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignUp;
