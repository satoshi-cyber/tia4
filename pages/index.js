import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Magic } from "magic-sdk";
import { useRouter } from "next/router";

import { Input, FormIcon } from "../components/Form";

import Logo from "../public/logo.svg";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async ({ email }) => {
    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
    ).auth.loginWithMagicLink({ email });

    router.push("/record");

    console.log(did);
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const isLoggedIn = await new Magic(
          process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
        ).user.isLoggedIn();

        if (isLoggedIn) {
          router.push("/record");
        }
      } catch {
        // Handle errors if required!
      }
    };

    if (window) {
      checkLogin();
    }
  }, [router]);

  return (
    <div className="flex flex-1 w-full justify-center items-center py-20">
      <div className="p-6 max-w-[480px] w-full flex flex-col justify-center items-center ">
        <Logo className="absolute top-6 left-6" width={120} />
        <p className="text-3xl mb-6 text-gray-900 text-center">
          Change your life Today!
        </p>
        <p className="text-gray-600 mb-4">Continue with email</p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Input
            type="email"
            placeholder="your@email.com"
            after={<FormIcon name="HiOutlineMail" size={20} />}
            {...register("email")}
          />
          <button
            type="submit"
            className=" bg-gradient-to-r from-purple-500 w-full p-3 text-sm bg-gray-800 text-gray-100 active:bg-indigo-800 focus:outline-none rounded-full focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 shadow-sm"
          >
            Login / Signup
          </button>
        </form>
        <p className="text-gray-600 my-5">OR</p>
        <div className="grid grid-cols-2 grid-rows-1 gap-4 w-full">
          <button className="p-4 text-xs bg-gray-800 text-gray-100 focus:outline-none rounded-full bg-[#1877F2]">
            Continue with Facebook
          </button>
          <button className="p-4 text-xs bg-gray-800 text-gray-100 focus:outline-none rounded-full bg-[#2766C2]">
            Sign in with Linkedin
          </button>
        </div>
      </div>
    </div>
  );
}
