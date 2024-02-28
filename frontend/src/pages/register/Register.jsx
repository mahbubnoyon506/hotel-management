import React from "react";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import APIKit from "../../components/commons/helpers/ApiKit";
import { useAuth } from "../../contexts/appContext";

import Button from "../../components/shared/Button";
import Inputfield from "../../components/forms/Inputfield";

function Register() {
  const { dispatch } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await APIKit.auth.register(data);
      const { token, message } = response.data;

      // Store the token in local storage
      localStorage.setItem("auth_token", token);
      toast.success(message);
      dispatch({ type: "LOGIN", payload: { user: response.data.userId } });
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="container mx-auto py-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center text-2xl font-bold text-gray-700 pb-12">
          Create an account
        </p>
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
            placeholder="Type your email"
            label="Your Email"
            field="email"
            formType={register}
            required="Email is required"
            errors={errors?.email?.message}
          />
          <Inputfield
            type="password"
            label="Type password"
            placeholder="Type password"
            field="password"
            formType={register}
            required="Password is required"
            minLength={{
              value: 6,
              message: "Password must be al least 6 characters",
            }}
            errors={errors?.password?.message}
          />
          <div className="flex gap-2 items-center justify-between">
            <div>
              <p className="inline">Already have an account?</p>{" "}
              <Link className="underline text-sky-600" to="/login">
                Login
              </Link>
            </div>
            <Button variant="sky" type="submit">
              Register
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
