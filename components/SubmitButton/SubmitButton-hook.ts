import { useFormState } from 'react-hook-form'

interface SubmitButtonOptions {
  allowEmptySubmit?: boolean
}

export const useSubmitButton = ({ allowEmptySubmit }: SubmitButtonOptions) => {
  const { isSubmitting, isDirty } = useFormState()

  if (allowEmptySubmit) {
    return { disabled: isSubmitting }
  }

  return {
    disabled: !isDirty || isSubmitting,
  }
}
