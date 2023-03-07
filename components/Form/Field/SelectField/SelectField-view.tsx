import React from 'react';
import get from 'lodash.get';
import { useFormContext, useFormState } from 'react-hook-form';
import { Text } from '@/components';
import clsx from 'clsx';

import { SelectFieldProps } from './SelectField-types';

import Select from '../../UncontrolledField/Select';

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  ...restProps
}) => {
  const { errors } = useFormState({ name, exact: true });
  const { register } = useFormContext();

  const error = get(errors, name);

  return (
    <div className="w-full mb-4">
      {label && (
        <Text
          className="text-sm text-gray-700 mb-2 text-left font-medium"
          text={label}
          skeletonProps={{ width: 80 }}
        />
      )}
      <Select {...register(name)} {...restProps} />
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

export default SelectField;
