import React, { useState } from "react";
import { FaImage } from "react-icons/fa";

function ImaheUploadField({ formType = () => {}, watch }) {
  const [previewSrc, setPreviewSrc] = useState("");

  const handleChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setPreviewSrc(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewSrc("");
    }
  };

  const existingImageUrls = watch("imageUrls");

  return (
    <>
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex justify-center items-center h-full rounded-lg border-2 border-dashed border-gray-900/25 px-6 py-10"
      >
        <div className="text-center">
          <FaImage
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 text-sm leading-6 text-gray-600">
            <span className="text-center rounded-md font-semibold text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600 focus-within:ring-offset-2 hover:text-sky-500">
              <span> Upload hotel Image </span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleChange}
                {...formType("imageFiles", {
                  validate: (imageFiles) => {
                    const totalLength =
                      imageFiles.length + (existingImageUrls?.length || 0);

                    if (totalLength === 0) {
                      return "At least one image should be added";
                    }

                    if (totalLength > 6) {
                      return "Total number of images cannot be more than 6";
                    }

                    return true;
                  },
                })}
              />
            </span>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG / JPG. Max 10 MB.
          </p>
        </div>
      </label>
      {previewSrc && (
        <img
          src={previewSrc}
          style={{ maxWidth: "100%", maxHeight: "300px" }}
          alt="Preview"
        />
      )}
    </>
  );
}

export default ImaheUploadField;
