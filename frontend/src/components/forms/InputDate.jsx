import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function InputDate({ fieldName = "", control, Controller }) {
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div>
      <Controller
        control={control}
        name={fieldName}
        defaultValue={new Date()}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            minDate={minDate}
            maxDate={maxDate}
            className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />
        )}
      />
    </div>
  );
}

export default InputDate;
