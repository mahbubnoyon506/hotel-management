import React from "react";

function TextAreaField({
  label = "",
  placeholder = "",
  rows,
  errors = "",
  field,
  formType = () => {},
  required,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600" htmlFor="">
        {label}
      </label>
      <textarea
        className={`py-2 px-3 w-full bg-gray-100 rounded focus:outline-sky-500 focus:outline-1 ring-1 ring-gray-300 ${
          errors.length ? "border-1 border-red-500" : ""
        }`}
        rows={rows}
        placeholder={placeholder}
        {...formType(field, { required })}
      />
      <span className="text-sm text-red-500">{errors}</span>
    </div>
  );
}

export default TextAreaField;
