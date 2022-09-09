import { useFormState } from "react-hook-form";

import { addHook } from "../lib";

export const FormService = {
  SubmitButton: "FormService-submitButton",
};

addHook(FormService.SubmitButton, (control) => {
  const { isSubmitting, isDirty } = useFormState({ control });

  return {
    disabled: !isDirty || isSubmitting,
  };
});
