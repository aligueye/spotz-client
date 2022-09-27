import React, { useContext } from "react";

import UserContext from "../utils/UserContext";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <div>This is HOME</div>
      <h3>{user?.email}</h3>
    </div>
  );
};

export default Home;
