import React, { useEffect, useMemo, useState } from "react";

import HouseContext from "../utils/HouseContext";
import Map from "./components/Map";
import { useNavigate } from "react-router-dom";

import "./results.css";

const getClosetHouses = async (lat, lng) => {
  return fetch("https://spotz-api-app.azurewebsites.net/houses/results", {
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
  const [selectedHouse, setSelectedHouse] = useState();
  const navigate = useNavigate();

  const value = useMemo(
    () => ({ selectedHouse, setSelectedHouse }),
    [selectedHouse, setSelectedHouse]
  );

  const aHouse = async () => {
    setHouses(await getClosetHouses(lat, lng));
  };

  useEffect(() => {
    aHouse();
  }, []);

  return (
    <div className="results-page">
      <HouseContext.Provider value={value}>
        <div className="results-page-map">
          <Map lat={lat} lng={lng} houses={houses} />
        </div>
        {selectedHouse && (
          <div className="map-details">
            <div className="map-details__address">{`${selectedHouse?.address}, ${selectedHouse?.city}`}</div>
            <div className="map-details__rent">{`rent: $${selectedHouse?.price}`}</div>
            <div className="map-details__beds">{`beds: ${selectedHouse?.bedrooms}`}</div>
            <div className="map-details__baths">{`baths: ${selectedHouse?.bathrooms}`}</div>
            <button
              className="map-details__cta"
              onClick={() => navigate(`/house?id=${selectedHouse?.id}`)}
            >
              Let's Go
            </button>
          </div>
        )}
        <div className="nearby-results">
          <h2 className="nearby-results__heading">Houses near search</h2>
          {houses &&
            houses.map((house, key) => (
              // expand house details when clicked
              <div
                className="nearby-results__house"
                key={key}
                onClick={() => console.log(house)}
              >
                <div>{`${house?.address}, ${house?.city}`}</div>
              </div>
            ))}
        </div>
      </HouseContext.Provider>
    </div>
  );
};

export default Results;
