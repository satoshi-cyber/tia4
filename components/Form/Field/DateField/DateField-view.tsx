import React from 'react';
import { formatISO } from 'date-fns';
import { Controller, useFormContext } from 'react-hook-form';
import Text from '@/components/Text';
import clsx from 'clsx';

import { DateFieldProps } from './DateField-types';

import Input from '../../UncontrolledField/Input';

const DateField: React.FC<DateFieldProps> = ({ name, label, ...restProps }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <div className="w-full group/wrapper mb-4" data-error={Boolean(error)}>
          {label && (
            <Text
              className="text-sm text-gray-600 mb-2 text-left font-medium"
              text={label}
              skeletonProps={{ width: 80 }}
            />
          )}
          <Input
            {...restProps}
            type="date"
            name={name}
            value={
              value
                ? formatISO(value, {
                    representation: 'date',
                  })
                : ''
            }
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.valueAsDate)}
            ref={ref}
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
      )}
    />
  );
};

export default DateField;
