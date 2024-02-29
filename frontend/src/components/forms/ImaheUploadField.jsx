import React, { useState } from "react";

import { FaImage } from "react-icons/fa";

function ImaheUploadField({ field, hotelImages, formType = () => {} }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    // Update selected files
    setSelectedFiles([...selectedFiles, ...files]);

    if (files.length + hotelImages.length > 5) {
      alert("Maximum allowed images is 6");
      return;
    }

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5 MB");
        return;
      }
    }
    // Update image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

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
                name={field}
                type="file"
                className="sr-only"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                {...formType("images")}
              />
            </span>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG / JPG. Max 10 MB.
          </p>
        </div>
      </label>
      <div className="flex flex-wrap gap-4">
        {imagePreviews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Preview ${index + 1}`}
            className="w-36 h-36"
          />
        ))}
      </div>
    </>
  );
}

export default ImaheUploadField;
