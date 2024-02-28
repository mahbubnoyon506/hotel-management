import React from "react";
import HotelForm from "../../components/forms/HotelForm";

function MyHotels() {
  return (
    <div className="container mx-auto py-20 ">
      <p className="text-center text-2xl font-bold text-gray-700 pb-12">
        Add Hotel
      </p>
      <HotelForm />
    </div>
  );
}

export default MyHotels;
