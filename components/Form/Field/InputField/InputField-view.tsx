import React from 'react';
import get from 'lodash.get';
import { useFormContext, useFormState } from 'react-hook-form';
import Text from '@/components/Text';
import clsx from 'clsx';

import { InputFieldProps } from './InputField-types';

import Input from '../../UncontrolledField/Input';

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  ...restProps
}) => {
  const { errors } = useFormState({ name, exact: true });
  const { register } = useFormContext();

  const error = get(errors, name);

  return (
    <div className="w-full group/wrapper mb-4" data-error={Boolean(error)}>
      {label && (
        <Text
          className="text-sm text-gray-600 mb-2 text-left font-medium"
          text={label}
          skeletonProps={{ width: 80 }}
        />
      )}
      <Input {...register(name)} {...restProps} />
      <p
        className={clsx(
          'transition-all text-sm text-red-600 -mt-2 text-left text overflow-hidden',
          error?.message ? 'max-h-[20px]' : 'max-h-[0px]'
        )}
      >
        {error?.message?.toString()}
      </p>
    </div>
  );
};

export default InputField;
