import React, { useEffect, useMemo, useState } from "react";

import HouseContext from "../utils/HouseContext";
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
  const [selectedHouse, setSelectedHouse] = useState();

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
    <div>
      <HouseContext.Provider value={value}>
        Results!!!!
        <br />
        <br />
        {selectedHouse && (
          <h1 onClick={() => console.log("opening page")}>
            {selectedHouse.address}
          </h1>
        )}
        <Map lat={lat} lng={lng} houses={houses} />
        <div className="house-list-item">
          <h2>Houses near search</h2>
          {houses &&
            houses.map((house) => (
              // expand house details when clicked
              <div onClick={() => console.log(house)}>
                <h3>{house?.address}</h3>
              </div>
            ))}
        </div>
      </HouseContext.Provider>
    </div>
  );
};

export default Results;
