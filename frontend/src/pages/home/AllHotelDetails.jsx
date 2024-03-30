import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import APIKit from "../../components/commons/helpers/ApiKit";

function AllHotelDetails() {
  const { id } = useParams();

  const { isloading, error, data } = useQuery({
    queryKey: ["search/hotel-details"],
    queryFn: () =>
      APIKit.hotels.hoteldetails(id).then(({ data }) => data.results),
  });

  console.log(data);
  return <div>AllHotelDetails</div>;
}

export default AllHotelDetails;
