import React from "react";

import { MdTravelExplore } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";

import Button from "../shared/Button";
import InputDate from "../forms/InputDate";
import { useForm, Controller } from "react-hook-form";

function SearchPanel() {
  const { handleSubmit, register, control, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="  ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="-mb-14 p-3 bg-orange-400 rounded shadow-md flex flex-col xl:flex-row justify-between gap-2"
      >
        <div className="grid grid-cols-2 lg:flex lg:flex-wrap items-center gap-2 justify-between">
          <div className="flex flex-row items-center flex-1 bg-white p-2">
            <MdTravelExplore size={25} className="mr-2" />
            <input
              placeholder="Where to go?"
              className="text-md w-full focus:outline-none"
              {...register("search")}
            />
          </div>

          <div className="flex bg-white px-2 py-1 lg:w-56">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultsCount")}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCoults")}
              />
            </label>
          </div>
          <div className="">
            <InputDate
              fieldName="startDate"
              placeholder="Check-In Date"
              Controller={Controller}
              control={control}
            />
          </div>
          <div>
            <InputDate
              fieldName="stopDate"
              placeholder="Check-Out Date"
              Controller={Controller}
              control={control}
            />
          </div>
        </div>

        <div className="flex gap-1">
          <Button
            variant="sky"
            extraClassName=" text-white font-bold text-lg hover:bg-blue-500"
            type="submit"
          >
            Search
          </Button>
          <Button
            variant="danger-outline"
            extraClassName=" font-bold text-lg"
            onClick={() => reset()}
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SearchPanel;
