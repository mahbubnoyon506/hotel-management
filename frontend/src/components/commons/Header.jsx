import React from "react";
import { Link } from "react-router-dom";
import Hero from "../Hero";
import { useAuth } from "../../contexts/appContext";

function Header() {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  return (
    <div className="bg-blue-800 py-6">
      <div className=" container mx-auto flex justify-between pb-6">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Holidays.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to="/sign-in"
            className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
          >
            Sign {isLoggedIn ? "Out" : "In"}
          </Link>
        </span>
      </div>
      <Hero />
    </div>
  );
}

export default Header;
