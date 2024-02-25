import React from "react";
import Inputfield from "../../components/forms/Inputfield";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import APIKit from "../../components/commons/helpers/ApiKit";

function Login() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await APIKit.auth.login(data);
      const { token, message } = response.data;

      // Store the token in local storage
      localStorage.setItem("auth_token", token);
      toast.success(message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="container mx-auto py-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-lg font-semibold text-gray-700">
          Login to your account
        </p>
        <div className="space-y-3">
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
          <div className="flex gap-2 items-end">
            <Button variant="sky" type="submit">
              Login
            </Button>
            <p>Don't have an account?</p>{" "}
            <Link className="underline text-sky-600" to="/register">
              Create account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
