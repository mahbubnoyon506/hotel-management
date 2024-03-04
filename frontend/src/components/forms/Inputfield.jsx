import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Inputfield({
  type,
  label = "",
  placeholder = "",
  defaultValue = "",
  errors = "",
  field,
  formType = () => {},
  required,
  minLength = {},
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1 relative">
      <label className="text-gray-600" htmlFor="">
        {label}
      </label>
      <input
        type={passwordVisible ? "text" : type}
        className={`py-2 px-3 w-full bg-gray-100 rounded focus:outline-sky-500 focus:outline-1 ring-1 ring-gray-300 ${
          errors.length ? "border-1 border-red-500" : ""
        }`}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...formType(field, { required, minLength })}
      />
      {type === "password" ? (
        <div
          className="text-gray-700 absolute top-9 right-3"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          {" "}
          {passwordVisible ? (
            <FaEye className="cursor-pointer" size={25} />
          ) : (
            <FaEyeSlash className="cursor-pointer" size={25} />
          )}{" "}
        </div>
      ) : null}
      <span className="text-sm text-red-500">{errors}</span>
    </div>
  );
}

export default Inputfield;
