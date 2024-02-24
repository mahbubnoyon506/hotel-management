import React from "react";

import APIKit from "../../components/commons/helpers/ApiKit";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import Button from "../../components/shared/Button";
import Inputfield from "../../components/forms/Inputfield";

function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const promise = APIKit.auth.register(data);
    return toast.promise(promise, {
      loading: "Loading...",
      success: "Registration successful",
      error: "Something went wrong!",
    });
  };

  return (
    <div className="container mx-auto py-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-lg font-semibold text-gray-700">Create an account</p>
        <div className="space-y-3">
          <Inputfield
            type="text"
            placeholder="Type your name"
            label="Your name"
            field="name"
            formType={register}
            required="Name is required"
            errors={errors?.name?.message}
          />
          <Inputfield
            type="email"
            placeholder="Type your name"
            label="Your Email"
            field="email"
            formType={register}
            required="Email is required"
            errors={errors?.email?.message}
          />
          <Inputfield
            type="password"
            label="Type password"
            field="password"
            formType={register}
            required="Password is required"
            minLength={{
              value: 6,
              message: "Password must be al least 6 characters",
            }}
            errors={errors?.password?.message}
          />
          <Button variant="sky" type="submit">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
