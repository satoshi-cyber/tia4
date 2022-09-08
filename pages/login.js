import { useForm } from "react-hook-form";

import { Input, FormIcon } from "../components/Form";

import Logo from "../public/logo.svg";
import { Action, Hook, Inject, useAction } from "../lib";
import { AuthService, FormService } from "../services";

export default function Home() {
  const { action: login } = useAction([AuthService.login]);

  const { register, handleSubmit, control } = useForm();

  return (
    <div className="flex flex-1 w-full justify-center items-center py-20">
      <div className="p-6 max-w-[480px] w-full flex flex-col justify-center items-center ">
        <Hook hookKey={[AuthService.redirect]} />
        <Logo className="absolute top-6 left-6" width={120} />
        <p className="text-3xl mb-6 text-gray-900 text-center">
          Change your life Today!
        </p>
        <form onSubmit={handleSubmit(login)} className="w-full">
          <p className="text-gray-600 mb-4">Continue with email</p>
          <Input
            type="email"
            placeholder="your@email.com"
            after={<FormIcon name="HiOutlineMail" size={20} />}
            {...register("email")}
          />
          <Inject hookKey={[FormService.SubmitButton, control]}>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 w-full p-3 text-sm bg-gray-800 text-gray-100 active:bg-indigo-800 focus:outline-none rounded-full focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 shadow-sm disabled:bg-gray-800 disabled:from-gray-500"
            >
              Login / Signup
            </button>
          </Inject>
        </form>
        <p className="text-gray-600 my-5">OR</p>
        <div className="grid grid-cols-2 grid-rows-1 gap-4 w-full">
          <Action hookKey={[AuthService.loginWithProvider, "facebook"]}>
            <button className="p-4 text-xs bg-gray-800 text-gray-100 focus:outline-none rounded-full bg-[#1877F2] disabled:bg-gray-800">
              Continue with Facebook
            </button>
          </Action>
          <Action hookKey={[AuthService.loginWithProvider, "linkedin"]}>
            <button className="p-4 text-xs bg-gray-800 text-gray-100 focus:outline-none rounded-full bg-[#2766C2] disabled:bg-gray-800">
              Sign in with Linkedin
            </button>
          </Action>
        </div>
      </div>
    </div>
  );
}
