import { useFormContext, useFormState } from "react-hook-form";

import { addHook } from "../lib";

export const FormService = {
  SubmitButton: "FormService-submitButton",
  Register: "FormService-Register",
};

addHook(FormService.SubmitButton, () => {
  const { isSubmitting, isDirty } = useFormState();

  return {
    disabled: !isDirty || isSubmitting,
  };
});

addHook(FormService.Register, (name) => {
  const form = useFormContext();

  if (!form) return {};

  return form.register(name);
});
