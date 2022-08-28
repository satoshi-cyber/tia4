import React from "react";
import * as Icons from "react-icons/hi";
import clsx from "clsx";

import Logo from "../public/logo.svg";

const VARIANT = {
  default: {
    width: "w-full",
    container:
      "mb-4 border border-gray-300 shadow-sm focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 focus-within:border-purple-300 flex items-stretch rounded-md overflow-hidden",
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

const TextArea = ({
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
      <textarea {...restProps} className={classNames.input} />
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

const labelStyle = "text-sm text-gray-900 text-left w-full mb-2";

export default function Home() {
  return (
    <div className="flex flex-1 w-full justify-center items-center">
      <div className="p-6 max-w-[480px] w-full flex flex-col justify-center items-center">
        <Logo className="absolute top-6 left-6" width={120} />
        <p className="text-3xl mb-4 text-gray-900 text-center">
          Complete your <br />
          profile!
        </p>
        <div className="my-4 w-[100px] h-[100px] border border-gray-200 shadow-sm block flex items-center justify-center text-center rounded-full">
          <p className="text-sm text-gray-600">
            Upload
            <br /> picture
          </p>
        </div>
        <p className={labelStyle}>Fullname:</p>
        <Input
          type="text"
          name="fullname"
          placeholder="Lorem Ipsum"
          after={<FormIcon name="HiOutlineUser" size={20} />}
        />
        <p className={labelStyle}>Linkedin:</p>
        <Input
          type="email"
          name="email"
          placeholder="lorem@ipsum.com"
          after={<FormIcon name="HiOutlineLink" size={20} />}
        />
        <p className={labelStyle}>Description:</p>
        <TextArea type="email" name="email" placeholder="lorem@ipsum.com" />
        <p className={labelStyle}>Cv:</p>
        <TextArea type="email" name="email" placeholder="lorem@ipsum.com" />
        <button className="mt-4 bg-gradient-to-r from-purple-500 w-full p-3 text-sm bg-gray-800 text-gray-100 active:bg-indigo-800 focus:outline-none rounded-full focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 shadow-sm">
          Preview
        </button>
      </div>
    </div>
  );
}
