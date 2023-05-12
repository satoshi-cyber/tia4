import React from 'react';
import get from 'lodash.get';
import { useFormContext, useFormState } from 'react-hook-form';
import Text from '@/components/Text';
import { debounce } from 'debounce';
import clsx from 'clsx';

import { InputFieldProps } from './DebounceField-types';

import Input from '../../UncontrolledField/Input';

const DebounceField: React.FC<InputFieldProps> = ({
  name,
  label,
  interval = 500,
  ...restProps
}) => {
  const { errors } = useFormState({ name, exact: true });
  const { register } = useFormContext();

  const error = get(errors, name);

  const registerProps = register(name);

  return (
    <div className="w-full group/wrapper mb-4" data-error={Boolean(error)}>
      {label && (
        <Text
          className="text-sm text-gray-600 mb-2 text-left font-medium"
          text={label}
          skeletonProps={{ width: 80 }}
        />
      )}
      <Input
        {...registerProps}
        {...restProps}
        onChange={debounce(registerProps.onChange, interval)}
      />
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

export default DebounceField;
