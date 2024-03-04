import React from "react";

function CheckboxField({
  label = "",
  value = "",
  fieldName = "",
  checkBoxOptions,
  formType = () => {},
  required,
  isMulty = "false",
  defaultValue = null,
}) {
  return (
    <>
      {isMulty ? (
        <div className="cursor-pointer grid grid-cols-3">
          {checkBoxOptions.map((item) => (
            <div>
              <input
                className=" cursor-pointer"
                type="checkbox"
                id={item.value}
                name={fieldName}
                value={item.value}
                defaultChecked={defaultValue?.includes(item.value)}
                {...formType(fieldName, { required })}
              />
              <label className="text-gray-600 cursor-pointer" for={item.value}>
                {" "}
                {item.label}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <input
            className=" cursor-pointer"
            type="checkbox"
            id={fieldName}
            name={fieldName}
            value={value}
          />
          <label className="text-gray-600 cursor-pointer" for={fieldName}>
            {" "}
            {label}
          </label>
        </div>
      )}
    </>
  );
}

export default CheckboxField;
