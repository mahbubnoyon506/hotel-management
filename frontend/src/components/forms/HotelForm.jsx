import React, { useState } from "react";
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
  const [hotelImages, setHotelImages] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  console.log(hotelImages);

  const onSubmit = async (data) => {
    try {
      // Send the URLs to your backend
      console.log(hotelImages);
      const formData = new FormData();
      formData.append("city", data.city);
      formData.append("name", data.name);
      formData.append("country", data.country);
      formData.append("description", data.description);
      formData.append("pricePerNight", data.pricePerNight);
      formData.append("startRating", data.startRating);
      formData.append("type", data.type);
      formData.append("facilities", data.facilities);
      formData.append("adultCount", data.adultCount);
      formData.append("childCount", data.childCount);

      if (data.images && data.images.length > 0) {
        // Append each image file to FormData
        for (let i = 0; i < data.images.length; i++) {
          formData.append("images", data.images[i]);
        }
      }

      // Assuming 'addHotel' is your API call function
      await APIKit.myHotels.addHotel(formData);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
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
        <ImaheUploadField
          formType={register}
          field="imageUrls"
          hotelImages={hotelImages}
          setHotelImages={setHotelImages}
        />
        <Button type="submit" variant="sky">
          Add Hotel
        </Button>
      </form>
    </div>
  );
}

export default HotelForm;
