import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import APIKit from "../../components/commons/helpers/ApiKit";
import { useForm } from "react-hook-form";
import Inputfield from "../../components/forms/Inputfield";
import TextAreaField from "../../components/forms/TextAreaField";
import SelectField from "../../components/forms/SelectField";
import RadioBadgesField from "../../components/forms/RadioBadgesField";
import CheckboxField from "../../components/forms/CheckboxField";
import ImaheUploadField from "../../components/forms/ImaheUploadField";
import Button from "../../components/shared/Button";

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

function HotelDetails() {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["my-hotels/details"],
    queryFn: () =>
      APIKit.myHotels.hotelDetails(id).then(({ data }) => data.results),
  });

  const [hotelImages, setHotelImages] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("city", data.city);
      formData.append("name", data.name);
      formData.append("country", data.country);
      formData.append("description", data.description);
      formData.append("pricePerNight", data.pricePerNight);
      formData.append("starRating", data.starRating);
      formData.append("type", data.type);
      formData.append("facilities", data.facilities);
      formData.append("adultCount", data.adultCount);
      formData.append("childCount", data.childCount);

      if (data.images && data.images.length > 0) {
        for (let i = 0; i < data.images.length; i++) {
          formData.append("images", data.images[i]);
        }
      }
      await APIKit.myHotels.putHotelDetails(id, formData);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };
  // string to array
  const defaultFacilities = data?.facilities.split(",");

  return (
    <div className="  py-12 space-y-5">
      <p className="text-2xl font-bold text-gray-700">Manage Hotel</p>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Inputfield
          type="text"
          label="Name"
          placeholder="Type hotel name"
          field="name"
          formType={register}
          defaultValue={data?.name}
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
              defaultValue={data?.city}
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
              defaultValue={data?.country}
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
          defaultValue={data?.description}
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
              defaultValue={data?.pricePerNight}
              //   errors={errors}
            />
          </div>
          <div className="w-full">
            <SelectField
              label="Start Rating"
              placeholder="Select rating"
              field="starRating"
              formType={register}
              required="Rating is required"
              selectOptions={ratingOptions}
              defaultValue={data?.starRating}
              //   errors={errors}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-600 font-medium">Type</p>
          <RadioBadgesField
            field="type"
            formType={register}
            type={data?.type}
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
            defaultValue={defaultFacilities}
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
                defaultValue={data?.adultCount}
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
                defaultValue={data?.childCount}
                // errors={errors}
              />
            </div>
          </div>
        </div>
        {data?.imageUrls ? (
          <div>
            <img className="w-40 h-40" src={data?.imageUrls} alt="" />
          </div>
        ) : null}

        <ImaheUploadField
          formType={register}
          field="imageUrls"
          hotelImages={hotelImages}
          setHotelImages={setHotelImages}
          defaultValue={data?.imageUrls}
        />
        <Button type="submit" variant="sky">
          Edit Hotel
        </Button>
      </form>
    </div>
  );
}

export default HotelDetails;
