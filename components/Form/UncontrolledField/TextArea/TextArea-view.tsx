import React from 'react';
import Text from '@/components/Text';
import SkeletonLoader from '@/components/SkeletonLoader';
import TextareaAutosize from 'react-textarea-autosize';

import { TextAreaProps } from './TextArea-types';
import { useTextArea } from './TextArea-hook';

const TextArea: React.FC<TextAreaProps> = React.forwardRef(
  (
    { variant, before, className, after, name, minRows = 2, ...restProps },
    ref
  ) => {
    const { classNames } = useTextArea({ variant, className });

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
          count={minRows}
          wrapper={({ children }: { children?: React.ReactElement }) => (
            <div {...restProps} className={classNames.input}>
              {children}
            </div>
          )}
          after={
            <TextareaAutosize
              minRows={minRows}
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

export default TextArea;
