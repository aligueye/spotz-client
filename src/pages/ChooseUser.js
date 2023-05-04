import React from "react";
import { Link } from "react-router-dom";

const ChooseUser = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md mt-[-20]">
        <h1 className="text-3xl font-bold mb-6">Choose Something?</h1>
        <Link
          to="/login"
          className="bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-900 w-full text-center block mb-3"
        >
          Renter
        </Link>
        <br />
        <Link
          to="/landlord-login"
          className="bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-900 w-full text-center block"
        >
          Landlord
        </Link>
      </div>
    </div>
  );
};

export default ChooseUser;
