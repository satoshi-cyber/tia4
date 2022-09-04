import React from "react";
import * as Icons from "react-icons/hi";
import clsx from "clsx";

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

export const FormIcon = ({ name, className }) => {
  const IconComponent = Icons[name];

  return (
    <div className={className}>
      <IconComponent size={20} />
    </div>
  );
};

export const Input = ({
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

export const TextArea = ({
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

export const Select = ({
  variant = "default",
  before,
  className,
  after,
  name,
  ...restProps
}) => {
  const classNames = {
    input: clsx(
      VARIANT[variant].padding,
      VARIANT[variant].style,
      "pr-10",
      className
    ),
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
      <select {...restProps} className={classNames.input} />
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
