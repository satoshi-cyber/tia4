import React from 'react';
import SkeletonLoader from '@/components/SkeletonLoader';

import { SelectProps } from './Select-types';
import { useSelect } from './Select-hook';

const Select: React.FC<SelectProps> = React.forwardRef(
  ({ variant, before, className, after, name, options, ...restProps }, ref) => {
    const { classNames } = useSelect({ variant, className });

    return (
      <div className={classNames.container}>
        {before && (
          <label htmlFor={name} className={classNames.appendContainer}>
            {React.cloneElement(before, {
              className: classNames.appendLeft,
            })}
          </label>
        )}
        <SkeletonLoader
          wrapper={({ children }: { children?: React.ReactElement }) => (
            <div {...restProps} className={classNames.input}>
              {children}
            </div>
          )}
          after={
            <select
              {...restProps}
              name={name}
              className={classNames.input}
              ref={ref as any}
            >
              {options.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          }
        />
        {after && (
          <label htmlFor={name} className={classNames.appendContainer}>
            {React.cloneElement(after, {
              className: classNames.appendRight,
            })}
          </label>
        )}
      </div>
    );
  }
);

export default Select;
