import React from "react";

import { useForm } from "react-hook-form";

const postImage = async (house, data) => {
  const formData = new FormData();
  formData.append("file", data.image[0]);
  formData.append("house_id", house.id);

  return fetch(`https://spotz-api.azurewebsites.net/upload/${house.id}`, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.ok;
    })
    .catch((err) => console.log(err));
};

const ImageUploader = ({ house, fetchImages }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await postImage(house, data);
    if (res) {
      fetchImages();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-4">
        <input
          type="file"
          {...register("image")}
          className="bg-gray-100 rounded-lg p-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default ImageUploader;
