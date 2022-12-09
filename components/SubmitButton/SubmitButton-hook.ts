import { useFormState } from 'react-hook-form'

export const useSubmitButton = () => {
  const { isSubmitting, isDirty } = useFormState()

  return {
    disabled: !isDirty || isSubmitting,
  }
}
