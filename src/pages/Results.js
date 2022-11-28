import React, { useState } from "react";
import Map from "./components/Map";

const Results = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const [address, setAddress] = useState(queryParams.get("address"));
  const [lat, setLat] = useState(Number(queryParams.get("lat")));
  const [lng, setLng] = useState(Number(queryParams.get("lng")));

  return (
    <div>
      Results!!!!
      <h3>addy: {address}</h3>
      <h4>lat: {lat}</h4>
      <h4>lng: {lng}</h4>
      <Map lat={lat} lng={lng} />
    </div>
  );
};

export default Results;
