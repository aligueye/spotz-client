import React, { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import UserContext from "../utils/UserContext";

const putUser = async ({ password, user }) => {
  const token = localStorage.getItem("token");
  const body = { ...user };
  if (password) {
    body.password = password;
  }

  return fetch("http://127.0.0.1:5000/landlord/", {
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

const LandlordProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [failed, setFailed] = useState();

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
    <div>
      <h1>Landlord Profile</h1>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
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
        {failed === true && <h4>Something went wrong</h4>}
        {/* Add way to assign house to landlord */}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default LandlordProfile;
