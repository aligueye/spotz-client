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

  return fetch(`http://127.0.0.1:5000/house/${house.id}`, {
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
  return fetch(`http://127.0.0.1:5000/house/${houseId}`, {
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
  return fetch(`http://127.0.0.1:5000/house/${houseId}`, {
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
  return fetch(`http://127.0.0.1:5000/uploads/${houseId}`, {
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
  return fetch(`http://127.0.0.1:5000/upload/${uploadId}`, {
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
    console.log(response);
  };

  console.log(images);

  return (
    <div>
      <h1>Edit house</h1>
      {images && (
        <div>
          {images.map((image) => (
            <div>
              <img width={400} height={200} src={image.url} alt="house" />
              <button onClick={() => deleteImage(image)}>Delete</button>
            </div>
          ))}
        </div>
      )}
      {/* {show images here} */}
      <p>Address: {house.address}</p>
      <p>Zip: {house.zipcode}</p>
      <p>City: {house.city}</p>
      <p>Bedrooms: {house.bedrooms}</p>
      <p>Bathrooms: {house.bathrooms}</p>
      <p>Price: {house.price}</p>
      <p>Year Built: {house.year_built}</p>
      <p>Square Feet: {house.square_feet}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit">Update House</button>
      </form>
      <br />
      <ImageUploader house={house} />
      <br />
      <br />
      <button onClick={onDelete}>Delete House</button>
    </div>
  );
};

export default EditHouse;
