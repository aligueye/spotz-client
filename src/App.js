import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import useToken from "./utils/useToken";
import UserContext from "./utils/UserContext";

import Home from "./pages/Home";
import About from "./pages/About";
import ChooseUser from "./pages/ChooseUser";
import StudentLogin from "./pages/StudentLogin";
import StudentSignUp from "./pages/StudentSignUp";
import StudentProfile from "./pages/StudentProfile";
import LandlordLogin from "./pages/LandlordLogin";
import LandlordSignUp from "./pages/LandlordSignUp";
import LandlordProfile from "./pages/LandlordProfile";
import ErrorPage from "./pages/ErrorPage";
import Results from "./pages/Results";
import AddHouse from "./pages/AddHouse";
import EditHouse from "./pages/EditHouse";
import NavBar from "./pages/components/NavBar";
import HouseDetails from "./pages/HouseDetails";

import "./app.css";
import "./index.css";

function App() {
  // FIXME: user is lost after refreshing page
  // Add something to use token to get user on refresh

  // FIXME: user is still active after token has expired

  const [user, setUser] = useState();
  const { token, setToken } = useToken();

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const logOut = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <div>
      <Router>
        <UserContext.Provider value={value}>
          <NavBar props={{ logOut }} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/user" element={<ChooseUser />} />
            <Route
              path="/login"
              element={<StudentLogin setToken={setToken} />}
            />
            <Route
              path="landlord-login"
              element={<LandlordLogin setToken={setToken} />}
            />
            <Route path="/signup" element={<StudentSignUp />} />
            <Route path="/landlord-signup" element={<LandlordSignUp />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/landlord-profile" element={<LandlordProfile />} />
            <Route path="/results" element={<Results />} />
            <Route path="/house" element={<HouseDetails />} />
            <Route path="/add-house" element={<AddHouse />} />
            <Route path="/edit-house" element={<EditHouse />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
