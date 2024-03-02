import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function ImageUpload() {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      images: [],
    },
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Limit to 6 images
    if (files.length > 6) {
      alert("Maximum allowed images is 6");
      return;
    }

    // Update form value
    setValue("images", files);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();

      if (data.images && data.images.length > 0) {
        // Append each file to FormData
        for (let i = 0; i < data.images.length; i++) {
          formData.append("images", data.images[i]);
        }

        await axios.post(
          "http://localhost:5000/api/my-hotels/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        console.error("No images selected for upload.");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };
  return (
    <div>
      <h1>Multiple Image Uploader</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          multiple
          {...register("images")}
        />
        <button type="submit">Upload</button>
      </form>
      <div style={{ display: "flex", marginTop: "20px" }}>
        {/* Display selected images */}
        {/* {register("images")?.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              style={{ width: "100px", height: "100px", marginRight: "10px" }}
            />
          ))} */}
      </div>
    </div>
  );
}

export default ImageUpload;
