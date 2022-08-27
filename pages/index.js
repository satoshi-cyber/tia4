import React from "react";
import * as Icons from "react-icons/hi";
import clsx from "clsx";

import Logo from "../public/logo.svg";

const VARIANT = {
  default: {
    width: "w-full",
    container:
      "m-4 border border-gray-300 shadow-sm focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 focus-within:border-purple-300 flex items-stretch rounded-md overflow-hidden",
    containerWidth: "w-full",
    style: "border-none focus:ring-0 flex-1",
    padding: "px-3 py-2",
    appendContainer: "flex items-center",
    appendRight: "pr-3 border-l h-full flex items-center pl-3",
    appendLeft: "pl-3",
  },
  clean: {
    container: "flex items-stretch rounded-md overflow-hidden",
    containerWidth: "w-full",
    style: "border-none focus:ring-0 flex-1",
    padding: "px-0 py-2",
    appendContainer: "flex items-center",
    appendRight: "pr-3 border-l h-full flex items-center pl-3",
    appendLeft: "mr-2",
  },
};

const FormIcon = ({ name, className }) => {
  const IconComponent = Icons[name];

  return (
    <div className={className}>
      <IconComponent size={20} />
    </div>
  );
};

const Input = ({
  variant = "default",
  before,
  className,
  after,
  name,
  ...restProps
}) => {
  const classNames = {
    input: clsx(VARIANT[variant].padding, VARIANT[variant].style, className),
    container: clsx(
      VARIANT[variant].container,
      VARIANT[variant].containerWidth
    ),
    appendContainer: VARIANT[variant].appendContainer,
    appendLeft: VARIANT[variant].appendLeft,
    appendRight: VARIANT[variant].appendRight,
  };

  return (
    <div className={classNames.container}>
      {before && (
        <label htmlFor={name} className={classNames.appendContainer}>
          {React.cloneElement(before, {
            className: classNames.appendLeft,
          })}
        </label>
      )}
      <input {...restProps} className={classNames.input} />
      {after && (
        <label htmlFor={name} className={classNames.appendContainer}>
          {React.cloneElement(after, {
            className: classNames.appendRight,
          })}
        </label>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="p-6 max-w-[480px] w-full flex flex-col justify-center items-center ">
        <Logo className="absolute top-6 left-6" width={120} />
        <p className="text-3xl mb-6 text-gray-900 text-center">
          Change your life
          <br />
          Today!
        </p>
        <Input
          type="email"
          name="email"
          placeholder="lorem@ipsum.com"
          after={<FormIcon name="HiOutlineMail" size={20} />}
        />
        <button className="bg-gradient-to-r from-purple-500 w-full p-3 text-sm bg-gray-800 text-gray-100 active:bg-indigo-800 focus:outline-none rounded-md focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 shadow-sm">
          Login / Signup
        </button>
        <p className="my-5">OR</p>
        <button className="p-4 text-sm bg-gray-800 text-gray-100 focus:outline-none rounded-md bg-[#1877F2]">
          Continue with facebook
        </button>
      </div>
    </div>
  );
}
