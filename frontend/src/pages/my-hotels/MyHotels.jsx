import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import APIKit from "../../components/commons/helpers/ApiKit";
import { useAuth } from "../../contexts/AppContext";
import Button from "../../components/shared/Button";
import { useNavigate } from "react-router-dom";

function MyHotels() {
  const navigate = useNavigate();
  const { state } = useAuth();
  const payloads = state.user;

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["all-hotels"],
    queryFn: () =>
      APIKit.myHotels.allHotels(payloads).then(({ data }) => data.results),
    keepPreviousData: true,
  });

  if (isLoading) {
    ("Loading...");
  }
  if (error) {
    ("Something went wrong...");
  }
  return (
    <div className="container mx-auto py-12 space-y-5">
      <div className="flex flex-col md:flex-row justify-between items-end ">
        <p className="text-center text-2xl font-bold text-gray-700">
          My Hotels
        </p>
        <Button variant="sky" onClick={() => navigate("/add-hotel")}>
          Add Hotel
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {data?.map((hotel) => (
          <div
            className="outline outline-1 outline-gray-300 p-4"
            key={hotel._id}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <img className=" lg:aspect-[8/5]" src={hotel.imageUrls} alt="" />
              <div className="">
                <h2 className="text-2xl font-bold text-gray-700">
                  {hotel.name}
                </h2>
                <p className="line-clamp-3">{hotel.description}</p>
                <div className="flex flex-wrap gap-2 py-3">
                  <div className="border border-slate-300 rounded-sm px-2 py-1 flex items-center capitalize">
                    <BsMap className="mr-1" />
                    {hotel.city}, {hotel.country}
                  </div>
                  <div className="border border-slate-300 rounded-sm px-2 py-1 flex items-center capitalize">
                    <BsBuilding className="mr-1" />
                    {hotel.type}
                  </div>
                  <div className="border border-slate-300 rounded-sm px-2 py-1 flex items-center">
                    <BiMoney className="mr-1" />£{hotel.pricePerNight} per night
                  </div>
                  <div className="border border-slate-300 rounded-sm px-2 py-1 flex items-center capitalize">
                    {" "}
                    <BiHotel className="mr-1" />
                    {hotel.adultCount} adults, {hotel.childCount} children
                  </div>
                  <div className="border border-slate-300 rounded-sm px-2 py-1 flex items-center">
                    <BiStar className="mr-1" />
                    {hotel.starRating || "5"} Star Rating
                  </div>
                </div>
                <Button variant="sky">Details View</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyHotels;
