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
  return fetch("https://spotz-api-app.azurewebsites.net/student/", {
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
      response.isLandlord = false;
      setUser(response);
    } else {
      setFailed(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="p-6 mt-6 text-left border w-96 rounded-xl shadow-xl bg-white">
        <h1 className="mb-5 text-3xl font-bold">Renter Profile</h1>
        <p>
          <span className="font-bold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-bold">Password:</span> {user.password}
        </p>
        <p>
          <span className="font-bold">School:</span> {user.school}
        </p>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              placeholder={user?.password}
              {...register("password")}
              className="mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">School</span>
            <input
              type="text"
              placeholder={user?.school}
              {...register("school")}
              className="mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
            />
          </label>
          {failed && <h4 className="text-red-500">Something went wrong</h4>}
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
