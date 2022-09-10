import { useFormContext, useFormState } from "react-hook-form";

import { addHook } from "../lib";

export const FormService = {
  submitButton: "FormService-submitButton",
  register: "FormService-Register",
};

addHook(FormService.submitButton, () => {
  const { isSubmitting, isDirty } = useFormState();

  return {
    disabled: !isDirty || isSubmitting,
    type: "submit",
  };
});

addHook(FormService.register, (name) => {
  const form = useFormContext();

  if (!form) return {};

  return form.register(name);
});
