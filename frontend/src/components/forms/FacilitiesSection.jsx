import React from "react";
import CheckboxField from "./CheckboxField";

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

function FacilitiesSection() {
  return (
    <div>
      <p className="text-gray-600">Facilities</p>

      <CheckboxField
        isMulty="true"
        fieldName="facilities"
        checkBoxOptions={facilitiesOptions}
      />
    </div>
  );
}

export default FacilitiesSection;
