import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import APIKit from "../../components/commons/helpers/ApiKit";
import SelectField from "../../components/forms/SelectField";
import { AiFillStar } from "react-icons/ai";
import Button from "../../components/shared/Button";
import { FaEuroSign } from "react-icons/fa";
import { facitiliesOptions } from "../../components/commons/helpers/Constant";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/shared/Pagination";

const sortOptions = [
  { label: "Start rating", value: "star" },
  { label: "Price per night (Low to high)", value: "low-to-high" },
  { label: "Price per night (High to low)", value: "high-to-low" },
];

function getFacilityLabel(facilityValue) {
  const matchedOption = facitiliesOptions.find(
    (option) => option.value === facilityValue
  );
  return matchedOption ? matchedOption.label : null;
}

function Home() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["hotels/search"],
    queryFn: () =>
      APIKit.hotels.allhotels({ page: page }).then(({ data }) => data),
  });
  console.log(data);
  console.log(page);

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <div className="container mx-auto grid grid-cols-4 gap-4 pt-20 pb-8">
      {" "}
      <div className="border border-1 border-gray-400 rounded p-4 space-y-4 divide-y divide-gray-400">
        <p className="text-lg font-semibold text-gray-500">Filter By</p>
      </div>{" "}
      <div className="col-span-3 space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-500">
            {} Hotels found in {}
          </p>
          <SelectField
            label="Sort by"
            placeholder="Sort by.."
            field="starRating"
            // formType={register}
            required="Rating is required"
            selectOptions={sortOptions}
          />{" "}
        </div>
        <div className="flex flex-col gap-4">
          {data?.results.map((hotel) => (
            <div
              key={hotel._id}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 border border-1 border-gray-400 rounded p-4"
            >
              <div>
                <img
                  className=" aspect-[5/5] "
                  src={hotel.imageUrls[0]}
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-between col-span-2 ">
                <div>
                  <div className="flex items-center">
                    {Array.from({ length: hotel.starRating }).map(() => (
                      <AiFillStar className="fill-yellow-400" />
                    ))}
                    <p className=" capitalize ml-2">{hotel.type}</p>
                  </div>
                  <p className="text-2xl font-semibold"> {hotel.name} </p>
                  <p className=" line-clamp-4 my-5 "> {hotel.description} </p>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex flex-wrap gap-2 ">
                    {hotel?.facilities
                      ?.split(",")
                      .slice(0, 3)
                      .map((facility) => (
                        <div className="bg-gray-300 rounded-md px-3 py-1">
                          {" "}
                          {getFacilityLabel(facility)}{" "}
                        </div>
                      ))}
                  </div>
                  <div className="space-y-1 w-36">
                    <p className="font-semibold flex items-center">
                      {" "}
                      <FaEuroSign className="" size={15} />{" "}
                      {hotel.pricePerNight} Per night{" "}
                    </p>
                    <Button
                      onClick={() => navigate(`/details/${hotel._id}`)}
                      variant="sky"
                    >
                      View more
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          page={data?.pagination.page || 2}
          pages={data?.pagination.pages || 1}
          onPageChange={(page) => setPage(page)}
        />
      </div>{" "}
    </div>
  );
}

export default Home;
