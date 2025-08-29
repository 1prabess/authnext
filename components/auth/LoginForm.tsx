"use client";

import { useForm } from "react-hook-form";
import FormField from "../common/FormField";
import { LoginSchema, LoginSchemaType } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { signin } from "@/actions/auth/login";
import SocialAuth from "./SocialAuth";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const [isPending, startTransition] = useTransition();

  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");

  const onSubmit = (data: LoginSchemaType) => {
    startTransition(() => {
      signin(data).then((res) => {
        if (res.success) setSuccessMessage(res.success);
        if (res.error) setErrorMessage(res.error);
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col  gap-4 max-w-md mx-auto p-6 bg-white dark:bg-transparent"
    >
      <h1 className="text-4xl mb-1 font-semibold">Login to your account</h1>

      <FormField
        id="email"
        label="Email"
        placeholder="Enter your email"
        register={register}
        errors={errors}
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        register={register}
        errors={errors}
      />

      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
      {successMessage && <span>{successMessage}</span>}

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 mt-2 rounded-sm font-medium bg-black text-white dark:bg-white dark:text-black hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
      </button>

      <h3 className="text-center my-1">Or continue with</h3>

      <SocialAuth />
    </form>
  );
};

export default LoginForm;
