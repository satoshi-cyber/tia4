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

const Icon = ({ name, ...props }) => {
  const IconComponent = Icons[name];

  return <IconComponent {...props} />;
};

export default function Home() {
  return (
    <div className="flex flex-1 w-full justify-center items-center py-20">
      <div className="p-6 max-w-[480px] w-full flex flex-col justify-center items-center">
        <Logo className="absolute top-6 left-6 z-20" width={120} />
        <div className="absolute left-0 top-0 h-full w-[70px] border-r border-r-gray-200 pt-28 flex flex-col transition-all ease-in-out hover:w-[240px] group overflow-hidden">
          <div className="absolute w-[240px]">
            <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
              <Icon
                name="HiPlusCircle"
                size={30}
                className="text-gray-500 group-one-hover:text-purple-800"
              />
              <span className="ml-5 group-hover:ml-2 transition-all ease-in-out">
                Add an interview
              </span>
            </a>
            <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
              <Icon
                name="HiPlay"
                size={30}
                className="text-gray-500 group-one-hover:text-purple-800"
              />
              <span className="ml-5 group-hover:ml-2 transition-all ease-in-out">
                Interviews
              </span>
            </a>
            <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
              <Icon
                name="HiArchive"
                size={30}
                className="text-gray-500 group-one-hover:text-purple-800"
              />
              <span className="ml-5 group-hover:ml-2 transition-all ease-in-out">
                Drafts
              </span>
            </a>
            <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
              <Icon
                name="HiUserCircle"
                size={30}
                className="text-gray-500 group-one-hover:text-purple-800"
              />
              <span className="ml-5 group-hover:ml-2 transition-all ease-in-out">
                My interviews
              </span>
            </a>
            <a className="pl-5 mb-5 flex flex-row items-center text-gray-500 group-one hover:text-purple-800 cursor-pointer">
              <Icon
                name="HiUser"
                size={30}
                className="text-gray-500 group-one-hover:text-purple-800"
              />
              <span className="ml-5 group-hover:ml-2 transition-all ease-in-out">
                Profile
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
