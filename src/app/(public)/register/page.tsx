"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { FaAngleRight, FaEye, FaEyeSlash } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";

interface Inputs {
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  password: string;
}

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const request = data;

    await api
      .post("users", request)
      .then(() => {
        router.push("register/finished");
      })
      .catch((error) => {
        if (error?.response === undefined) {
          return toast.error("Server Error, try again");
        }
        if (error?.response?.data?.message.length > 1) {
          error.response?.data?.message.map((message: string) =>
            toast.error(message)
          );
        } else {
          toast.error(error?.response?.data?.message);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <main className="w-[55%] h-screen py-8 pl-[110px] flex justify-center">
      <div className="flex flex-col w-96 items-start justify-center gap-8 px-[1px] overflow-auto">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <p className="m-0 text-sm font-semibold text-gray-500">
            Joined us before?{" "}
            <Link href="/login" className="text-blue-950 font-bold">
              Login
            </Link>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full"
        >
          <div className="flex flex-col">
            <input
              className={`border border-gray-300 rounded-md p-3 outline-green-500 w-full ${
                errors.name ? "border-red-700 outline-red-700" : ""
              }`}
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-700 px-4">This field is required</span>
            )}
          </div>

          <div className="flex flex-col">
            <input
              className={`border border-gray-300 rounded-md p-3 outline-green-500 w-full ${
                errors.email ? "border-red-700 outline-red-700" : ""
              }`}
              placeholder="E-mail"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-700 px-4">This field is required</span>
            )}
          </div>

          <div className="flex flex-col">
            <input
              className={`border border-gray-300 rounded-md p-3 outline-green-500 w-full ${
                errors.dateOfBirth ? "border-red-700 outline-red-700" : ""
              }`}
              type="date"
              {...register("dateOfBirth", { required: true })}
            />
            {errors.dateOfBirth && (
              <span className="text-red-700 px-4">This field is required</span>
            )}
          </div>

          <div className="flex flex-col">
            <select
              className={`border border-gray-300 rounded-md p-3 outline-green-500 w-full ${
                errors.gender ? "border-red-700 outline-red-700" : ""
              }`}
              {...register("gender", { required: true })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <span className="text-red-700 px-4">This field is required</span>
            )}
          </div>

          <div className="flex flex-col relative">
            <div className="relative">
              <input
                className={`border border-gray-300 rounded-md p-3 outline-green-500 w-full ${
                  errors.password ? "border-red-700 outline-red-700" : ""
                }`}
                maxLength={8}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "This field is required",
                  pattern: {
                    value: /^\d{8}$/,
                    message: "Password must be exactly 8 digits",
                  },
                })}
                onKeyPress={(e) => {
                  if (e.key === " ") e.preventDefault();
                }}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\s/g, "");
                }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && watch("password")?.length === 8 && (
              <span className="text-red-700 px-4">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-500 text-blue-950 font-bold py-3 w-full rounded-md flex justify-center items-center gap-3 hover:bg-green-700 transition-all duration-100 ease-in-out"
            >
              Continue <FaAngleRight />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
