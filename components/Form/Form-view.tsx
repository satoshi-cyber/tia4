import React from 'react'
import { FormProvider } from 'react-hook-form'

import { FormProps } from './Form-types'
import FormLoader from './FormLoader'

export const Form: React.FC<FormProps> = ({
  form,
  onSubmit,
  children,
  isLoading,
  ...restProps
}) => {
  const { handleSubmit } = form

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} {...restProps} noValidate>
        {children}
      </form>
      <FormLoader />
    </FormProvider>
  )
}
