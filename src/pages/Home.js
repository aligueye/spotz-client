import React, { useContext } from "react";

import UserContext from "../utils/UserContext";
import SearchBar from "./components/SearchBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const logEntry = ({ address, lat, lng }) => {
    console.log("called back", address, lat, lng);
    const path = `/results?address=${address}&lat=${lat}&lng=${lng}`;
    address && lat && lng && navigate(path);
  };

  return (
    <div>
      <div>Find rentals near you</div>
      <br />
      <SearchBar callBack={logEntry} />
    </div>
  );
};

export default Home;
