import React, { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";

const putUser = async ({ password, user }) => {
  const token = localStorage.getItem("token");
  const body = { ...user };
  if (password) {
    body.password = password;
  }

  return fetch("https://spotz-api.azurewebsites.net/landlord/", {
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

const getHouses = async (user) => {
  return fetch(
    `https://spotz-api.azurewebsites.net/landlord/${user.id}/houses`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return false;
    }
  });
};

const LandlordProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [failed, setFailed] = useState();
  const [houses, setHouses] = useState([]);

  const aHouse = async () => {
    setHouses(await getHouses(user));
  };

  useEffect(() => {
    aHouse();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ password }) => {
    const response = await putUser({ password, user });
    if (response) {
      response.isLandlord = true;
      setUser(response);
    } else {
      setFailed(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Landlord Profile</h1>
        <p className="mb-2">Email: {user.email}</p>
        <p className="mb-4">Password: {user.password}</p>
        <p className="font-semibold mb-4">Houses:</p>
        {houses &&
          houses.map((house, key) => {
            return (
              <div key={key} className="mb-2">
                <p>
                  {house.address}
                  {"  "}
                  <Link
                    to={`/edit-house?house_id=${house.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>
                </p>
              </div>
            );
          })}

        <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 w-full mb-6">
          <Link to="/add-house" className="text-white">
            Add a house
          </Link>
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold">Password</label>
            <input
              type="text"
              placeholder={user?.password}
              {...register("password")}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          {failed === true && (
            <h4 className="text-red-600 mb-4">Something went wrong</h4>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 w-full"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default LandlordProfile;
