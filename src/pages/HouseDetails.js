import React, { useState, useEffect } from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // This is important to import the styles

const HouseDetails = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const [house, setHouse] = useState({});
  const [images, setImages] = useState([]);

  const id = Number(queryParams.get("id"));

  const getHouse = async (id) => {
    return fetch(`https://spotz-api.azurewebsites.net/house/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  };

  const getImages = async (id) => {
    return fetch(`https://spotz-api.azurewebsites.net/uploads/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  };

  const fetchHouse = async () => {
    setHouse(await getHouse(id));
  };
  const fetchImages = async () => {
    setImages(await getImages(id));
  };

  useEffect(() => {
    fetchHouse();
    fetchImages();
  }, []);

  const {
    address,
    zipcode,
    city,
    bedrooms,
    bathrooms,
    price,
    year_built,
    square_feet,
  } = house;

  console.log(images);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">House Details</h1>
      <p>
        <span className="font-semibold">Address:</span> {address}
      </p>
      <p>
        <span className="font-semibold">Zipcode:</span> {zipcode}
      </p>
      <p>
        <span className="font-semibold">City:</span> {city}
      </p>
      <p>
        <span className="font-semibold">Bedrooms:</span> {bedrooms}
      </p>
      <p>
        <span className="font-semibold">Bathrooms:</span> {bathrooms}
      </p>
      <p>
        <span className="font-semibold">Price:</span> ${price}
      </p>
      <p>
        <span className="font-semibold">Year Built:</span> {year_built}
      </p>
      <p>
        <span className="font-semibold">Square Feet:</span> {square_feet} sqft
      </p>
      <div className="my-4">
        <h2 className="text-2xl font-semibold mb-4">Images:</h2>
        {images && images?.length > 0 && (
          <Carousel>
            {images.map((image) => (
              <div>
                <img src={image.url} />
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default HouseDetails;
