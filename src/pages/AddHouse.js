import React, { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import UserContext from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const postHouse = async (data, user, latLng) => {
  // FIXME: add token to this endpoint (API as well)

  const body = {
    landlord_id: user.id,
    latitude: latLng.lat,
    longitude: latLng.lng,
    ...data,
  };

  return fetch("https://spotz-api-app.azurewebsites.net/house/1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

const AddHouse = () => {
  const { user } = useContext(UserContext);
  const [failed, setFailed] = useState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // get geocode from address
    const latLng = await geocodeByAddress(
      data?.address + " " + data?.city + " " + data?.zipcode
    )
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        return latLng;
      })
      .catch((error) => console.error("Error", error));

    if (!latLng) {
      setFailed(true);
      return;
    }

    const response = await postHouse(data, user, latLng);

    if (response.ok) {
      navigate("/landlord-profile");
    } else {
      setFailed(true);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Hello {user.email}</h1>
      <h3 className="text-2xl mb-6">Enter House information</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block">
          <span>Address</span>
          <input
            type="text"
            {...register("address", { required: true })}
            className="block w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          ></input>
          {errors.address?.type === "required" && (
            <span role="alert" className="text-red-600">
              {" "}
              Address is required
            </span>
          )}
        </label>
        <label className="block">
          <span>Zip Code</span>
          <input
            type="text"
            {...register("zipcode", { required: true })}
            className="block w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          ></input>
          {errors.zipcode?.type === "required" && (
            <span role="alert" className="text-red-600">
              {" "}
              Zipcode is required
            </span>
          )}
        </label>
        <label className="block">
          <span>City</span>
          <input
            type="text"
            {...register("city")}
            className="block w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          ></input>
        </label>
        <label className="block">
          <span>Bedrooms</span>
          <input
            type="number"
            {...register("bedrooms")}
            className="block w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          ></input>
        </label>
        <label className="block">
          <span>Bathrooms</span>
          <input
            type="number"
            {...register("bathrooms")}
            className="block w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          ></input>
        </label>
        <label className="block">
          <span>Price</span>
          <input
            type="number"
            {...register("price")}
            className="block w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          ></input>
        </label>
        <label className="block">
          <span>Year Built</span>
          <input
            type="number"
            {...register("year_built")}
            className="block w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          ></input>
        </label>
        <label className="block">
          <span>Square Feet</span>
          <input
            type="number"
            {...register("square_feet")}
            className="block w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          ></input>
        </label>

        <br />
        {failed === true && (
          <h4 className="text-red-600 mb-4">Something went wrong</h4>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Create House
        </button>
      </form>
    </div>
  );
};

export default AddHouse;
