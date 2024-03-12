import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function InputDate({ formType = () => {}, field = "", placeholder = "" }) {
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      placeholder={placeholder}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      minDate={minDate}
      maxDate={maxDate}
      {...formType(field)}
      className="min-w-full bg-white p-2 focus:outline-none"
      wrapperClassName="min-w-full"
    />
  );
}

export default InputDate;
