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
        className="-mb-14 p-5 bg-orange-400 rounded shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-2"
      >
        <div className=" w-full flex flex-col md:flex-row md:items-center gap-2 ">
          <div className="flex items-center min-w-44 lg:w-full bg-white p-2">
            <MdTravelExplore size={25} className="mr-2" />
            <input
              placeholder="Where to go?"
              className="text-md w-full focus:outline-none"
              {...register("search")}
            />
          </div>

          <div className="flex bg-white px-2 py-1 w-full">
            <label className="items-center flex w-full">
              Adults:
              <input
                className="p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultsCount")}
              />
            </label>
            <label className="items-center flex w-full">
              Children:
              <input
                className="p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCoults")}
              />
            </label>
          </div>
          <div className="w-full">
            <InputDate
              fieldName="startDate"
              placeholder="Check-In Date"
              Controller={Controller}
              control={control}
            />
          </div>
          <div className="w-full">
            <InputDate
              fieldName="stopDate"
              placeholder="Check-Out Date"
              Controller={Controller}
              control={control}
            />
          </div>
        </div>

        <div className="flex gap-1">
          <div>
            <Button
              variant="sky"
              extraClassName=" text-white font-bold text-lg hover:bg-blue-500"
              type="submit"
            >
              Search
            </Button>
          </div>
          <div>
            <Button
              variant="danger-outline"
              extraClassName=" font-bold text-lg"
              onClick={() => reset()}
            >
              Clear
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchPanel;
