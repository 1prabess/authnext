"use client";

import { RegisterSchema, RegisterSchemaType } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "../common/FormField";
import { useState, useTransition } from "react";
import { signup } from "@/actions/auth/register";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: RegisterSchemaType) => {
    setErrorMessage("");
    setSuccessMessage("");

    startTransition(() => {
      signup(data).then((res) => {
        if (res.success) setSuccessMessage(res.success);
        if (res.error) setErrorMessage(res.error);
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-xl mx-auto p-6 bg-white dark:bg-transparent"
    >
      <h1 className="text-4xl mb-1 font-semibold">Create an account</h1>
      <FormField
        id="name"
        label="Name"
        placeholder="Enter your name"
        register={register}
        errors={errors}
      />

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

      <FormField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
        register={register}
        errors={errors}
      />

      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
      {successMessage && <span>{successMessage}</span>}

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 rounded-sm font-medium bg-black text-white dark:bg-white dark:text-black hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
