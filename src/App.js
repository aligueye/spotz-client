import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import useToken from "./utils/useToken";
import UserContext from "./utils/UserContext";

import Home from "./pages/Home";
import About from "./pages/About";
import StudentLogin from "./pages/StudentLogin";
import StudentSignUp from "./pages/StudentSignUp";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [user, setUser] = useState(null);
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
          <nav>
            <Link to="/"> Home </Link>
            <Link to="/about"> About </Link>
            {!user && <Link to="/login"> Login </Link>}
            {user && (
              <Link to="/" onClick={() => logOut()}>
                Sign Out
              </Link>
            )}
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={<StudentLogin setToken={setToken} />}
            />
            <Route path="/signup" element={<StudentSignUp />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
