import React from "react";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import APIKit from "./helpers/ApiKit";

import Hero from "../Hero";
import { useAuth } from "../../contexts/AppContext";

function Header() {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();

  const handleLogout = async () => {
    const handleSuccess = ({ data }) => {
      console.log(data);
      localStorage.removeItem("auth_token");
      navigate("/");
      dispatch({ type: "LOGOUT" });
      toast.success(data.message);
    };
    try {
      await APIKit.auth.logout().then(handleSuccess);
    } catch (error) {
      console.log("Failed to signout", error);
      toast.error("Failed to signout");
    }
  };
  console.log(state);
  return (
    <div className="bg-blue-800 py-6">
      <div className=" container mx-auto flex justify-between pb-6">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Holidays.com</Link>
        </span>
        <span className="flex space-x-2 items-center">
          {!state.isAuthenticated ? (
            <Link
              to="/login"
              className="flex bg-white items-center text-blue-600 px-6 py-3 font-bold hover:bg-gray-100 cursor-pointer "
            >
              Sign In
            </Link>
          ) : (
            <ul className="flex gap-4 items-center">
              <li className="text-lg font-semibold text-white">
                <Link to="">My Hotels</Link>
              </li>
              <li className="text-lg font-semibold text-white">
                <Link to="">My Booking</Link>
              </li>
              <li>
                <p
                  className="bg-white items-center text-blue-600 px-6 py-3 font-bold hover:bg-gray-100 cursor-pointer "
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </li>
            </ul>
          )}
        </span>
      </div>
      <Hero />
    </div>
  );
}

export default Header;
