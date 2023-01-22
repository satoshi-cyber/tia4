import React from 'react';
import get from 'lodash.get';
import { useFormContext, useFormState } from 'react-hook-form';
import { Text } from '@/components';
import clsx from 'clsx';

import { TextAreaFieldProps } from './TextAreaField-types';

import TextArea from '../../UncontrolledField/TextArea';

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  ...restProps
}) => {
  const { errors } = useFormState({ name, exact: true });
  const { register } = useFormContext();

  const error = get(errors, name);

  return (
    <div className="w-full">
      {label && (
        <Text
          className="text-sm text-gray-600 mb-3 text-left"
          text={label}
          skeletonProps={{ width: 80 }}
        />
      )}
      <TextArea {...restProps} {...register(name)} />
      <p
        className={clsx(
          'transition-all text-sm text-red-600 -mt-2 mb-6 text-left text overflow-hidden',
          error?.message ? 'max-h-[20px]' : 'max-h-[0px]'
        )}
      >
        {error?.message?.toString()}
      </p>
    </div>
  );
};

export default TextAreaField;
