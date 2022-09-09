import { useForm } from "react-hook-form";

import { Input, FormIcon } from "../components/Form";
import { Action, InjectHook, MergedActionState, useAction } from "../lib";
import { AuthService, FormService } from "../services";
import Logo from "../public/logo.svg";

export const Progres = () => {};

export default function Home() {
  const login = useAction([AuthService.login]);

  const { register, handleSubmit, control } = useForm();

  return (
    <div className="flex flex-1 w-full justify-center items-center py-20">
      <div className="p-6 max-w-[480px] w-full flex flex-col justify-center items-center">
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
          <InjectHook hookKey={[FormService.SubmitButton, control]}>
            <button
              type="submit"
              className="bg-gray-800 bg-gradient-to-r from-purple-500 w-full p-3 text-sm  text-gray-100 active:bg-indigo-800 focus:outline-none rounded-full focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 shadow-sm transition-all ease-in-out disabled:opacity-80"
            >
              Login / Signup
            </button>
          </InjectHook>
        </form>
        <p className="text-gray-600 my-5">OR</p>
        <div className="grid grid-cols-2 grid-rows-1 gap-4 w-full">
          <Action hookKey={[AuthService.loginWithProvider, "facebook"]}>
            <button className="p-4 text-xs bg-gray-800 text-gray-100 focus:outline-none rounded-full bg-[#1877F2] transition-all ease-in-out disabled:opacity-80 ">
              Continue with Facebook
            </button>
          </Action>
          <Action hookKey={[AuthService.loginWithProvider, "linkedin"]}>
            <button className="p-4 text-xs bg-gray-800 text-gray-100 focus:outline-none rounded-full bg-[#2766C2]transition-all ease-in-out  disabled:opacity-80 ">
              Sign in with Linkedin
            </button>
          </Action>
        </div>
        <MergedActionState
          hookKeys={[
            [AuthService.login],
            [AuthService.loginWithProvider, "facebook"],
            [AuthService.loginWithProvider, "linkedin"],
          ]}
        >
          {({ isSubmitting }) =>
            isSubmitting && (
              <div className="fixed bottom-0 w-full bottom-0">
                <div className="progress-bar">
                  <div className="progress-bar-value" />
                </div>
              </div>
            )
          }
        </MergedActionState>
      </div>
    </div>
  );
}
