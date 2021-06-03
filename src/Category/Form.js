import React from "react";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { add } from "../features/categorySlice";

export default function CategoryForm({ close }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    dispatch(add(data));
    close();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} className="w-100 mb-2" />
      {errors.name && <span>This field is required</span>}

      <div>
        <input type="submit" />

        <button onClick={close}> Cancel</button>
      </div>
    </form>
  );
}
