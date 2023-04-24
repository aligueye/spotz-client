import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import spotzLogo from "../../../images/spotz-logo.svg";
import "./NavBar.css";
import UserContext from "../../../utils/UserContext";

const NavBar = ({ logOut }) => {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          <img src={spotzLogo} alt="spotz logo" />
        </Link>
      </div>
      <div>
        <Link className="navbar__link" to="/about">
          about
        </Link>
        {!user && (
          <Link className="navbar__link" to="/user">
            log in
          </Link>
        )}
        {user && (
          <Link className="navbar__link" to="/" onClick={() => logOut()}>
            sign out
          </Link>
        )}
        {user && user.isLandlord === false && (
          <Link className="navbar__link" to="/profile">
            profile
          </Link>
        )}
        {user && user.isLandlord === true && (
          <Link className="navbar__link" to="/landlord-profile">
            profile
          </Link>
        )}
      </div>
    </nav>
  );
};

// Proptypes
NavBar.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func,
};

export default NavBar;
