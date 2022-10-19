import React from "react";
import { get } from "lodash";
import { useFormContext, useFormState } from "react-hook-form";

import { InputFieldProps } from "./InputField-types";

import { Input } from "../../UncontrolledField/Input";

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  ...restProps
}) => {
  const { errors } = useFormState({ name, exact: true });
  const { register } = useFormContext();

  const error = get(errors, name);

  return (
    <div className="w-full">
      {label && <p className="text-sm text-gray-600 mb-3 text-left">{label}</p>}
      <Input {...restProps} {...register(name)} />
      {error && (
        <p className="text-sm text-red-600 -mt-2 mb-6 text-left text">
          {error?.message?.toString()}
        </p>
      )}
    </div>
  );
};
