import React from "react";
import { get } from "lodash";
import { useFormContext, useFormState } from "react-hook-form";

import { SelectFieldProps } from "./SelectField-types";

import { Select } from "../../UncontrolledField/Select";

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  children,
  ...restProps
}) => {
  const { errors } = useFormState({ name, exact: true });
  const { register } = useFormContext();

  const error = get(errors, name);

  return (
    <div className="w-full">
      {label && <p className="text-sm text-gray-600 mb-3 text-left">{label}</p>}
      <Select {...restProps} {...register(name)}>
        {children}
      </Select>
      {error && (
        <p className="text-sm text-red-600 -mt-2 mb-6 text-left text">
          {error?.message?.toString()}
        </p>
      )}
    </div>
  );
};
