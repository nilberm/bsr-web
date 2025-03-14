"use client";

import Image from "next/image";
import logo_full from "../../../assets/logo/logo_full.svg";

import { FaAngleRight } from "react-icons/fa6";

import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Inputs {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false);

  const storeToken = async (token: string) => {
    try {
      localStorage.setItem("jwtToken", token);
    } catch (error) {
      console.error("Error to storage Token");
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const request = {
      email: data.email,
      password: data.password,
    };

    await api
      .post("login", request)
      .then((res) => {
        storeToken(res.data.access_token);
        router.push("/home");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <main className="w-[55%] h-screen pl-[110px] flex justify-center">
      <div className="flex flex-col w-96 items-start justify-center gap-8">
        <Image src={logo_full} alt="logo" />
        <h2 className="text-2xl font-bold">Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex flex-col">
            <input
              className={`border border-gray-300 rounded-md p-3 outline-green-500 w-full ${
                errors.email ? "border-red-700 outline-red-700" : ""
              }`}
              placeholder="E-mail"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-700 px-4">This field is required</span>
            )}
          </div>

          <div className="flex flex-col">
            <input
              className={`border border-gray-300 rounded-md p-3 outline-green-500 w-full ${
                errors.password ? "border-red-700 outline-red-700" : ""
              }`}
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-700 px-4">This field is required</span>
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
        <div className="flex flex-col justify-center items-center w-full gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="w-36 border-t border-gray-300"></div>
            <span className="text-gray-500 font-semibold">or</span>
            <div className="w-36 border-t border-gray-300"></div>
          </div>
          <div className="text-sm text-gray-500 font-bold">
            New to Build Self-Reliance?{" "}
            <Link href="/register" className="text-blue-950">
              Register
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
