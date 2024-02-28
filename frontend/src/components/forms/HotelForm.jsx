import React from "react";
import Inputfield from "./Inputfield";
import TextAreaField from "./TextAreaField";
import SelectField from "./SelectField";
import CheckboxField from "./CheckboxField";
import RadioBadgesField from "./RadioBadgesField";
import Button from "../shared/Button";
import { useForm } from "react-hook-form";
import ImaheUploadField from "./ImaheUploadField";
import APIKit from "../commons/helpers/ApiKit";

const ratingOptions = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 4, value: 4 },
  { label: 5, value: 5 },
];
const facilitiesOptions = [
  { label: "Free Wifi", value: "free-wifi" },
  { label: "Parking", value: "parking" },
  { label: "Airport Shuttle", value: "airport-shuttle" },
  { label: "Family Room", value: "family-room" },
  { label: "Non Smooking Room", value: "non-smooking-room" },
  { label: "Out Door Pool", value: "out-door-pool" },
  { label: "Spa", value: "spa" },
  { label: "Fitness Center", value: "fitness-center" },
];

function HotelForm() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    await APIKit.myHotels.addHotel(data);
  };
  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Inputfield
          type="text"
          label="Name"
          placeholder="Type hotel name"
          field="name"
          formType={register}
          //   errors={errors}
        />
        <div className="flex gap-4 justify-between">
          <div className="w-full">
            <Inputfield
              type="text"
              label="City"
              placeholder="Type city name"
              field="city"
              formType={register}
              //   errors={errors}
            />
          </div>
          <div className="w-full">
            <Inputfield
              type="text"
              label="Country"
              placeholder="Type country name"
              field="country"
              formType={register}
              //   errors={errors}
            />
          </div>
        </div>
        <TextAreaField
          type="textarea"
          label="Description"
          placeholder="Type short description"
          field="description"
          formType={register}
          rows={4}
          //   errors={errors}
        />
        <div className="flex gap-4 justify-between">
          <div className="w-full">
            <Inputfield
              type="number"
              label="Price per day"
              placeholder="Cost per day"
              field="pricePerNight"
              formType={register}
              //   errors={errors}
            />
          </div>
          <div className="w-full">
            <SelectField
              label="Start Rating"
              placeholder="Select rating"
              field="startRating"
              formType={register}
              required="Rating is required"
              selectOptions={ratingOptions}
              //   errors={errors}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-600 font-medium">Type</p>
          <RadioBadgesField
            field="type"
            formType={register}
            // errors={errors}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-600 font-medium">Facilities</p>
          <CheckboxField
            isMulty="true"
            fieldName="facilities"
            checkBoxOptions={facilitiesOptions}
            formType={register}
            // errors={errors}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-600 font-medium">Guests</p>
          <div className="flex gap-4 justify-between bg-gray-300 p-5">
            <div className="w-full">
              <Inputfield
                type="number"
                label="Adults"
                placeholder="Type adilts count"
                field="adultCount"
                formType={register}
                // errors={errors}
              />
            </div>
            <div className="w-full">
              <Inputfield
                type="number"
                label="Children"
                placeholder="Type children count"
                field="childCount"
                formType={register}
                // errors={errors}
              />
            </div>
          </div>
        </div>
        {/* <ImaheUploadField formType={register} watch={watch} /> */}
        <Button type="submit" variant="sky">
          Add Hotel
        </Button>
      </form>
    </div>
  );
}

export default HotelForm;
