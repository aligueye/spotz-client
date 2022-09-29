import React from "react";
import { Link } from "react-router-dom";

const ChooseUser = () => {
  return (
    <div>
      <h1>Choose Something?</h1>
      <Link to="/login">Renter</Link>
      <br />
      <Link to="/landlord-login">Landlord</Link>
    </div>
  );
};

export default ChooseUser;
