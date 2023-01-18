import { useContext } from 'react'
import { useFormState } from 'react-hook-form'
import LoadingProvider from '../LoadingProvider'

interface SubmitButtonOptions {
  allowEmptySubmit?: boolean
}

export const useSubmitButton = ({ allowEmptySubmit }: SubmitButtonOptions) => {
  const isProviderLoading = useContext(LoadingProvider.Context)

  const { isSubmitting, isDirty } = useFormState()

  if (allowEmptySubmit) {
    return { disabled: isSubmitting }
  }

  return {
    disabled: !isDirty || isSubmitting || isProviderLoading,
  }
}
