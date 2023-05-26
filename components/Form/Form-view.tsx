import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormProps } from './Form-types';
import FormLoader from './FormLoader';
import { useDefaults } from '@/hooks/useDefaults';
import { zodResolver } from '@hookform/resolvers/zod';

export const Form = <D extends z.AnyZodObject, T extends z.infer<D>>({
  onSubmit,
  children,
  isLoading,
  className,
  ...props
}: FormProps<D, T>) => {
  if ('form' in props) {
    const { handleSubmit } = props.form;

    return (
      <FormProvider {...props.form}>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data, { reset: () => {} }))}
          className={className}
          noValidate
        >
          {children}
        </form>
        <FormLoader />
      </FormProvider>
    );
  }

  const parseDefaults = useDefaults(props.schema);

  const form = useForm<T>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(props.schema),
    defaultValues: parseDefaults(props.data as any) as any,
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (!props.data) {
      return;
    }

    reset(parseDefaults(props.data as any) as any, {
      keepDirtyValues: true,
      keepDirty: true,
    });
  }, [reset, props.data]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(data, {
            reset: (data) => reset(parseDefaults(data as any) as any),
          })
        )}
        className={className}
        noValidate
      >
        {children}
      </form>
      <FormLoader />
    </FormProvider>
  );
};
