import React, { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import UserContext from "../utils/UserContext";

const postHouse = async ({ address, user }) => {
  // FIXME: add token to this endpoint (API as well)
  const body = { landlord_id: user.id, address: address };
  return fetch("http://127.0.0.1:5000/house/1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

const AddHouse = () => {
  const { user } = useContext(UserContext);

  const { register, handleSubmit, formState: errors } = useForm();

  const onSubmit = async ({ address }) => {
    const response = await postHouse({ address, user });
    // FIXME: add check if house was created (Update API as well)
  };

  return (
    <div>
      <h1>Hello {user.email}</h1>
      <h3>Enter House information</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Address <input type="text" {...register("address")}></input>
        </label>
        <br />
        <button type="submit">Create House</button>
      </form>
    </div>
  );
};

export default AddHouse;
