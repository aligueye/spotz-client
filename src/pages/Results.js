import React, { useEffect, useState } from "react";
import Map from "./components/Map";

const getClosetHouses = async (lat, lng) => {
  return fetch("http://127.0.0.1:5000/houses/results", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lat, lng }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return [];
      }
    })
    .catch((err) => console.log(err));
};
const Results = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const [address, setAddress] = useState(queryParams.get("address"));
  const [lat, setLat] = useState(Number(queryParams.get("lat")));
  const [lng, setLng] = useState(Number(queryParams.get("lng")));
  const [houses, setHouses] = useState();

  const aHouse = async () => {
    setHouses(await getClosetHouses(lat, lng));
  };

  useEffect(() => {
    aHouse();
  }, []);

  return (
    <div>
      Results!!!!
      <h3>addy: {address}</h3>
      <h4>lat: {lat}</h4>
      <h4>lng: {lng}</h4>
      <Map lat={lat} lng={lng} houses={houses} />
    </div>
  );
};

export default Results;
