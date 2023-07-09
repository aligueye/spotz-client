import React, { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import UserContext from "../utils/UserContext";
import { useNavigate } from "react-router-dom";

import ImageUploader from "./components/ImageUploader";

// method to update house
const putHouse = async (data, house) => {
  const { bedrooms, bathrooms, price, year_built, square_feet } = data;

  const body = { ...house };

  if (bedrooms) {
    body.bedrooms = bedrooms;
  }
  if (bathrooms) {
    body.bathrooms = bathrooms;
  }
  if (price) {
    body.price = price;
  }
  if (year_built) {
    body.year_built = year_built;
  }
  if (square_feet) {
    body.square_feet = square_feet;
  }

  return fetch(`https://spotz-api-app.azurewebsites.net/house/${house.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return false;
      }
    })
    .catch((err) => console.log(err));
};

// method to delete house by houseId
const deleteHouse = async (houseId) => {
  return fetch(`https://spotz-api-app.azurewebsites.net/house/${houseId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => console.log(err));
};

// method to get house
const getHouse = async (houseId) => {
  return fetch(`https://spotz-api-app.azurewebsites.net/house/${houseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => console.log(err));
};

const getImages = async (houseId) => {
  return fetch(`https://spotz-api-app.azurewebsites.net/uploads/${houseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => console.log(err));
};

const deleteUpload = async (uploadId) => {
  return fetch(`https://spotz-api-app.azurewebsites.net/upload/${uploadId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.ok;
    })
    .catch((err) => console.log(err));
};

const EditHouse = () => {
  const { user } = useContext(UserContext);
  const [house, setHouse] = useState({});
  const [images, setImages] = useState([]);
  const [failed, setFailed] = useState();

  const queryParams = new URLSearchParams(window.location.search);
  const houseId = Number(queryParams.get("house_id"));
  const navigate = useNavigate();

  const fetchHouse = async () => {
    setHouse(await getHouse(houseId));
  };

  const fetchImages = async () => {
    setImages(await getImages(houseId));
  };

  useEffect(() => {
    fetchHouse();
  }, []);

  useEffect(() => {
    fetchImages();
  }, [house]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await putHouse(data, house);
    if (response) {
      setHouse(response);
    } else {
      setFailed(true);
    }
  };

  const onDelete = async () => {
    const response = await deleteHouse(houseId);
    if (response) {
      navigate("/landlord-profile");
      console.log("House deleted");
    }
  };

  const deleteImage = async (image) => {
    const response = await deleteUpload(image.id);
    if (response) {
      fetchImages();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Edit house</h1>
        {images && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {images.map((image) => (
              <div key={image.id} className="relative">
                <img
                  className="w-full h-48 object-cover rounded-md"
                  src={image.url}
                  alt="house"
                />
                <button
                  onClick={() => deleteImage(image)}
                  className="absolute top-2 right-2 text-white bg-red-600 p-1 rounded-full hover:bg-red-700 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        {/* {show images here} */}
        <div className="space-y-2 mb-6">
          <p>Address: {house.address}</p>
          <p>Zip: {house.zipcode}</p>
          <p>City: {house.city}</p>
          <p>Bedrooms: {house.bedrooms}</p>
          <p>Bathrooms: {house.bathrooms}</p>
          <p>Price: {house.price}</p>
          <p>Year Built: {house.year_built}</p>
          <p>Square Feet: {house.square_feet}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            { label: "Bedrooms", field: "bedrooms" },
            { label: "Bathrooms", field: "bathrooms" },
            { label: "Price", field: "price" },
            { label: "Year Built", field: "year_built" },
            { label: "Square Feet", field: "square_feet" },
          ].map((fieldData) => (
            <div key={fieldData.field} className="flex flex-col">
              <label className="font-semibold">{fieldData.label}</label>
              <input
                type="number"
                {...register(fieldData.field)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
          <br />
          {failed === true && (
            <h4 className="text-red-600 mb-4">Something went wrong</h4>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 w-full mb-6"
          >
            Update House
          </button>
        </form>
        <br />
        <ImageUploader house={house} fetchImages={fetchImages} />
        <br />
        <br />
        <button
          onClick={onDelete}
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 w-full"
        >
          Delete House
        </button>
      </div>
    </div>
  );
};

export default EditHouse;
