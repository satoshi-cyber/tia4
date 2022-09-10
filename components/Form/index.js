import React from "react";
import * as Icons from "react-icons/hi";
import clsx from "clsx";
import { FormProvider, useForm } from "react-hook-form";
import { InjectProps, useAction } from "../../lib";
import { FormService } from "../../services";

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

export const Input = React.forwardRef(
  (
    { variant = "default", before, className, after, name, ...restProps },
    ref
  ) => {
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
        <input name={name} {...restProps} className={classNames.input} />
        {after && (
          <label htmlFor={name} className={classNames.appendContainer}>
            {React.cloneElement(after, {
              className: classNames.appendRight,
            })}
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

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

export const Form = ({ hookKey, children, ...restProps }) => {
  const action = useAction(hookKey);

  const form = useForm();

  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(action)} {...restProps}>
        {children}
      </form>
    </FormProvider>
  );
};

export const InputField = ({ name, label, ...restProps }) => (
  <div className="w-full">
    {label && <p className="text-sm text-gray-600 mb-3 text-left">{label}</p>}
    <Input name={name} {...restProps} />
  </div>
);

export const SelectField = ({ name, label, ...restProps }) => (
  <div className="w-full">
    {label && <p className="text-sm text-gray-600 mb-3 text-left">{label}</p>}
    <Select name={name} {...restProps} />
  </div>
);
