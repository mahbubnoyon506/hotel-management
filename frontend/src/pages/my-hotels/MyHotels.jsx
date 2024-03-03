import React from "react";
import HotelForm from "../../components/forms/HotelForm";
import { useQuery } from "@tanstack/react-query";
import APIKit from "../../components/commons/helpers/ApiKit";
import { useAuth } from "../../contexts/AppContext";

function MyHotels() {
  const { state } = useAuth();
  const payloads = state.user;
  console.log(payloads);
  const { isLoading, error, data } = useQuery({
    queryKey: ["all-hotels"],
    queryFn: () =>
      fetch(APIKit.myHotels.allHotels(payloads)).then((res) => res.json()),
  });
  console.log(data);
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
