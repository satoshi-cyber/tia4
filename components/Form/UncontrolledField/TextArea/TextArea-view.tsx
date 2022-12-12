import React from 'react'
import { Text } from '@/components'
import SkeletonLoader from '@/components/SkeletonLoader'

import { TextAreaProps } from './TextArea-types'

import { useSelect } from '../Select/Select-hook'

const TextArea: React.FC<TextAreaProps> = React.forwardRef(
  ({ variant, before, className, after, name, ...restProps }, ref) => {
    const { classNames } = useSelect({ variant, className })

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
          wrapper={({ children }: { children?: React.ReactElement }) => (
            <div {...restProps} className={classNames.input}>
              {children}
            </div>
          )}
          after={
            <textarea
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
    )
  }
)

export default TextArea
