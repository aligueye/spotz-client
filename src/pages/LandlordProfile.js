import React, { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";

const putUser = async ({ password, user }) => {
  const token = localStorage.getItem("token");
  const body = { ...user };
  if (password) {
    body.password = password;
  }

  return fetch("http://127.0.0.1:5000/landlord/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": token,
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return false;
    }
  });
};

const getHouses = async (user) => {
  return fetch(`http://127.0.0.1:5000/landlord/${user.id}/houses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return false;
    }
  });
};

const LandlordProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [failed, setFailed] = useState();
  const [houses, setHouses] = useState([]);

  const aHouse = async () => {
    setHouses(await getHouses(user));
  };

  useEffect(() => {
    aHouse();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ password }) => {
    const response = await putUser({ password, user });
    if (response) {
      response.isLandlord = true;
      setUser(response);
    } else {
      setFailed(true);
    }
  };

  return (
    <div>
      <h1>Landlord Profile</h1>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <p>Houses:</p>
      {houses &&
        houses.map((house, key) => {
          return (
            <div key={key}>
              <p>
                {house.address}
                {"  "}
                <Link to={`/edit-house?house_id=${house.id}`}>Edit</Link>
              </p>
            </div>
          );
        })}

      <button>
        <Link to="/add-house">Add a house</Link>
      </button>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Password{" "}
          <input
            type="text"
            placeholder={user?.password}
            {...register("password")}
          ></input>
        </label>

        <br />
        {failed === true && <h4>Something went wrong</h4>}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default LandlordProfile;
