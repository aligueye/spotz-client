import React, { useContext } from "react";

import UserContext from "../utils/UserContext";
import SearchBar from "./components/SearchBar";
import { useNavigate } from "react-router-dom";

import "./home.css";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const logEntry = ({ address, lat, lng }) => {
    const path = `/results?address=${address}&lat=${lat}&lng=${lng}`;
    address && lat && lng && navigate(path);
  };

  return (
    <div className="home-page">
      <div className="copy">
        <h1 className="copy__headline">Find rentals near you</h1>
      </div>
      <SearchBar callBack={logEntry} />
    </div>
  );
};

export default Home;
