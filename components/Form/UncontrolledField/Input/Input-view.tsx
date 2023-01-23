import React from 'react';
import { Text } from '@/components';
import SkeletonLoader from '@/components/SkeletonLoader';

import { InputProps } from './Input-types';
import { useInput } from './Input-hook';

const Input: React.FC<InputProps> = React.forwardRef(
  ({ variant, before, className, after, name, ...restProps }, ref) => {
    const { classNames } = useInput({ variant, className });

    return (
      <div className={classNames.container}>
        {before && (
          <Text
            as="label"
            htmlFor={name}
            className={classNames.appendContainer}
            text={React.cloneElement(before, {
              className: classNames.appendLeft,
            })}
          />
        )}
        <SkeletonLoader
          width="30%"
          wrapper={({ children }: { children?: React.ReactElement }) => (
            <div {...restProps} className={classNames.input}>
              {children}
            </div>
          )}
          after={
            <input
              name={name}
              {...restProps}
              ref={ref as any}
              className={classNames.input}
            />
          }
        />
        {after && (
          <Text
            as="label"
            htmlFor={name}
            className={classNames.appendContainer}
            text={React.cloneElement(after, {
              className: classNames.appendRight,
            })}
          />
        )}
      </div>
    );
  }
);

export default Input;
