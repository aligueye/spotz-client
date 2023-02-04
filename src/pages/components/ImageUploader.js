import React from "react";

import { useForm } from "react-hook-form";

const postImage = async (house, data) => {
  const formData = new FormData();
  formData.append("file", data.image[0]);
  formData.append("house_id", house.id);

  return fetch(`http://127.0.0.1:5000/upload/${house.id}`, {
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("image")} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUploader;
