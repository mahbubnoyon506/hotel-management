import React, { useState } from "react";

const hotelTypeOptions = [
  { label: "Budget", value: "budget" },
  { label: "Boutique", value: "boutique" },
  { label: "Luxury", value: "luxury" },
  { label: "Sky Resort", value: "sky-resort" },
  { label: "Business", value: "business" },
  { label: "Family", value: "family" },
  { label: "Romantic", value: "romantic" },
  { label: "Hiking", value: "fitness-center" },
  { label: "Cabin", value: "cabin" },
  { label: "Beach Resort", value: "beach-resort" },
  { label: "Golf Resort", value: "golf-resort" },
  { label: "Motel", value: "motel" },
  { label: "All Includes", value: "all-includes" },
  { label: "Pet Friendly", value: "pet-friendly" },
  { label: "Self Catering", value: "self-catering" },
];

function RadioBadgesField({
  field,
  formType = () => {},
  required,
  type = null,
}) {
  const [checked, setchecked] = useState(type || "");

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {hotelTypeOptions.map((item) => (
        <>
          <input
            type="radio"
            id={item.value}
            name="fav_language"
            value={item.value}
            className="hidden"
            checked={type}
            {...formType(field, { required })}
          />
          <label
            className={` ${
              item.value === checked ? "bg-sky-600 text-white" : "bg-gray-300"
            } text-gray-600 text-center py-2  rounded-full cursor-pointer hover:bg-sky-600 hover:text-white font-medium`}
            for={item.value}
            onClick={() => setchecked(item.value)}
          >
            {item.label}
          </label>
        </>
      ))}
    </div>
  );
}

export default RadioBadgesField;
