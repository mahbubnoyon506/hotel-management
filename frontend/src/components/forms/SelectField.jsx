import React from "react";

function SelectField({
  field = "",
  label = "",
  errors = "",
  defaultValue = null,
  selectOptions,
  formType = () => {},
  required,
}) {
  const backendValue = 3;
  console.log(defaultValue);
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600" htmlFor="">
        {label}
      </label>
      <select
        className={`py-2 px-3 w-full bg-gray-100 rounded focus:outline-sky-500 focus:outline-1 ring-1 ring-gray-300 ${
          errors.length ? "border-1 border-red-500" : ""
        }`}
        name={field}
        {...formType(field, { required })}
        defaultValue={defaultValue}
      >
        {selectOptions.map((item) => (
          <option value={item.value}> {item.label}</option>
        ))}
      </select>
      <span className="text-sm text-red-500">{errors}</span>
    </div>
  );
}

export default SelectField;
