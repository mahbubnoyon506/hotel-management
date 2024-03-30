import React from "react";
import HotelForm from "../../components/forms/HotelForm";

function AddHotel() {
  return (
    <div className="  py-12">
      <p className="text-center text-2xl font-bold text-gray-700 pb-12">
        Add Hotel
      </p>
      <HotelForm />
    </div>
  );
}

export default AddHotel;
