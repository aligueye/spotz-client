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
  console.log(data, user, latLng);
  const body = {
    landlord_id: user.id,
    latitude: latLng.lat,
    longitude: latLng.lng,
    ...data,
  };

  return fetch("http://127.0.0.1:5000/house/1", {
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
    <div>
      <h1>Hello {user.email}</h1>
      <h3>Enter House information</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Address{" "}
          <input
            type="text"
            {...register("address", { required: true })}
          ></input>
          {errors.address?.type === "required" && (
            <span role="alert"> Address is required</span>
          )}
        </label>
        <br />
        <label>
          Zip Code{" "}
          <input
            type="text"
            {...register("zipcode", { required: true })}
          ></input>
          {errors.zipcode?.type === "required" && (
            <span role="alert"> Zipcode is required</span>
          )}
        </label>
        <br />
        <label>
          City <input type="text" {...register("city")}></input>
        </label>
        <br />
        <label>
          Bedrooms <input type="number" {...register("bedrooms")}></input>
        </label>
        <br />
        <label>
          Bathrooms <input type="number" {...register("bathrooms")}></input>
        </label>
        <br />
        <label>
          Price <input type="number" {...register("price")}></input>
        </label>
        <br />
        <label>
          Year Built <input type="number" {...register("year_built")}></input>
        </label>
        <br />
        <label>
          Square Feet <input type="number" {...register("square_feet")}></input>
        </label>
        <br />
        <br />
        {failed === true && <h4>Something went wrong</h4>}
        <button type="submit">Create House</button>
      </form>
    </div>
  );
};

export default AddHouse;
